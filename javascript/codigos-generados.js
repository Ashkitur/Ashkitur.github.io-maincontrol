// ================== CONFIGURACIÓN ==================
const THRESHOLD = 2; 
// Si cantidad > THRESHOLD => un código por unidad (cada uno en su propia "casilla").
// Si cantidad <= THRESHOLD => solo 1 código.

// ================== UTILIDADES ==================
function generarSegmento() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function generarKey() {
  return `${generarSegmento()}-${generarSegmento()}-${generarSegmento()}`;
}

function obtenerCarritoSeguro() {
  try {
    const cart = typeof getCart === 'function' ? getCart() : [];
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function cargarCodigosGuardados() {
  try {
    const data = JSON.parse(localStorage.getItem('codigosGenerados')) || {};
    Object.keys(data).forEach(id => {
      if (typeof data[id] === 'string') data[id] = [data[id]];
    });
    return data;
  } catch {
    return {};
  }
}

function guardarCodigos(data) {
  localStorage.setItem('codigosGenerados', JSON.stringify(data));
}

function obtenerMapaCantidades(cart) {
  const mapa = new Map();
  cart.forEach(item => {
    const id = String(item.id);
    const cant = Number(item.cantidad || item.qty || item.quantity || 1) || 1;
    mapa.set(id, (mapa.get(id) || 0) + cant);
  });
  return mapa;
}

function prepararCodigosParaCarrito() {
  const cart = obtenerCarritoSeguro();
  const guardados = cargarCodigosGuardados();
  let cambiado = false;

  const mapaCantidades = obtenerMapaCantidades(cart);
  const idsActuales = new Set(mapaCantidades.keys());

  // Limpia ids que ya no están
  Object.keys(guardados).forEach(id => {
    if (!idsActuales.has(id)) {
      delete guardados[id];
      cambiado = true;
    }
  });

  // Ajusta cada id
  mapaCantidades.forEach((cantidad, id) => {
    if (!guardados[id]) guardados[id] = [];
    let necesarios = cantidad > THRESHOLD ? cantidad : 1;
    while (guardados[id].length < necesarios) {
      guardados[id].push(generarKey());
      cambiado = true;
    }
    if (guardados[id].length > necesarios) {
      guardados[id].length = necesarios;
      cambiado = true;
    }
  });

  if (cambiado) guardarCodigos(guardados);
  return { codigos: guardados, mapaCantidades };
}

// =============== RENDER (cada código = 1 casilla) ===============
function renderizarCodigos() {
  const wrapper = document.getElementById('codigos-wrapper');
  if (!wrapper) return;

  const cart = obtenerCarritoSeguro();
  if (cart.length === 0) {
    wrapper.innerHTML = `
      <p class="nota-codigos text-center mb-0">No hay artículos en el carrito.</p>
      <div class="text-center mt-3">
        <a href="index.html" class="btn-codigos secundario">Volver a la tienda</a>
      </div>`;
    return;
  }

  const { codigos, mapaCantidades } = prepararCodigosParaCarrito();
  const juegosLista = typeof juegos !== 'undefined' ? juegos : [];

  // Lista única de ids para tener datos base (nombre, portada)
  const metaPorId = {};
  cart.forEach(item => {
    const id = String(item.id);
    if (!metaPorId[id]) {
      const juegoData = juegosLista.find(j => String(j.id) === id);
      metaPorId[id] = {
        id,
        nombre: item.nombre || (juegoData ? juegoData.nombre : 'Juego'),
        thumb: juegoData && juegoData.portada
          ? juegoData.portada
          : 'img/ImagenesJuegos/ImagenesCaratulas/default.png'
      };
    }
  });

  // Generar un <li> por cada código
  const itemsHTML = Object.keys(codigos).flatMap(id => {
    const listaCods = codigos[id];
    const cantidad = mapaCantidades.get(id) || 1;
    const { nombre, thumb } = metaPorId[id];

    // Mostrar el multiplicador (xN) solo en la primera casilla si hay varias
    return listaCods.map((code, idx) => {
      // Opcional: nombre con sufijo de índice
      // const nombreMostrar = listaCods.length > 1 ? `${nombre} #${idx + 1}` : nombre;
      const nombreMostrar = nombre;

      const multiplicador = (idx === 0 && cantidad > 1)
        ? ` <small class="text-muted">(x${cantidad})</small>`
        : '';

      return `
        <li class="codigo-item">
          <div class="nombre-juego">
            <img src="${thumb}" alt="Portada ${nombre}" width="40" height="40" style="border-radius:10px;object-fit:cover;">
            <span>${nombreMostrar}${multiplicador}${listaCods.length > 1 ? ` <span class="badge-indice">#${idx + 1}</span>` : ''}</span>
          </div>
          <div class="codigo-box">
            <span class="codigo" data-id="${id}" data-index="${idx}">${code}</span>
            <button class="btn-copiar" type="button" onclick="copiarCodigo(this)" aria-label="Copiar código ${idx + 1}">
              <i class="fa-regular fa-copy"></i> Copiar
            </button>
          </div>
          <div class="badges">
            <span class="badge-mini">Digital</span>
          </div>
        </li>`;
    });
  }).join('');

  wrapper.innerHTML = `
    <ul class="lista-codigos">
      ${itemsHTML}
    </ul>
    <div class="text-center mt-4 d-flex flex-column flex-sm-row justify-content-center gap-2">
      <a href="index.html" class="btn-codigos secundario">Volver a la tienda</a>
    </div>
  `;
}

// =============== COPIAR ===============
function copiarCodigo(btn) {
  const cont = btn.closest('.codigo-item');
  if (!cont) return;
  const span = cont.querySelector('.codigo');
  if (!span) return;

  const texto = span.textContent.trim();
  navigator.clipboard.writeText(texto).then(() => {
    btn.classList.add('copiado');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
    setTimeout(() => {
      btn.classList.remove('copiado');
      btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar';
    }, 2000);
  });
}

// =============== MOSTRAR ===============
function mostrarCodigos() {
  const wrapper = document.getElementById('codigos-wrapper');
  if (!wrapper) return;
  if (wrapper.classList.contains('abierto')) return;

  renderizarCodigos();
  wrapper.classList.remove('d-none');
  requestAnimationFrame(() => {
    wrapper.classList.add('abierto', 'animar');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  prepararCodigosParaCarrito();
});