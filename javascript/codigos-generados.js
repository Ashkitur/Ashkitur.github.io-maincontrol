// Genera un segmento de 5 caracteres alfanuméricos mayúsculos
function generarSegmento() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < 5; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

// Genera la key completa FORMATO: XXXXX-XXXXX-XXXXX
function generarKey() {
  return `${generarSegmento()}-${generarSegmento()}-${generarSegmento()}`;
}

// Obtiene el carrito de la misma forma que tus otras funciones
function obtenerCarritoSeguro() {
  try {
    const cart = typeof getCart === 'function' ? getCart() : [];
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

// Carga códigos ya guardados
function cargarCodigosGuardados() {
  try {
    return JSON.parse(localStorage.getItem('codigosGenerados')) || {};
  } catch {
    return {};
  }
}

// Guarda códigos
function guardarCodigos(data) {
  localStorage.setItem('codigosGenerados', JSON.stringify(data));
}

// Prepara (genera si faltan) los códigos para cada ítem del carrito
function prepararCodigosParaCarrito() {
  const cart = obtenerCarritoSeguro();
  const guardados = cargarCodigosGuardados();
  let cambiado = false;

  // Mapa auxiliar para detectar items actuales
  const idsActuales = new Set(cart.map(i => String(i.id)));

  // Elimina códigos de productos que ya no están en el carrito
  Object.keys(guardados).forEach(id => {
    if (!idsActuales.has(id)) {
      delete guardados[id];
      cambiado = true;
    }
  });

  // Genera códigos para productos nuevos
  cart.forEach(item => {
    const id = String(item.id);
    if (!guardados[id]) {
      guardados[id] = generarKey();
      cambiado = true;
    }
  });

  if (cambiado) guardarCodigos(guardados);
  return guardados;
}

// Renderiza el bloque de códigos
function renderizarCodigos() {
  const wrapper = document.getElementById('codigos-wrapper');
  if (!wrapper) return;

  const cart = obtenerCarritoSeguro();
  if (cart.length === 0) {
   wrapper.innerHTML = `
  <p class="nota-codigos text-center mb-0">No hay artículos en el carrito.</p>
  <div class="text-center mt-3">
    <a href="index.html" class="btn-codigos secundario"
       onclick="localStorage.removeItem('compra'); showDetail(); updateProceedButton();">
      Volver a la tienda
    </a>
  </div>`;
return;

  }

  const codigos = prepararCodigosParaCarrito();

  // Intentamos acceder al array global "juegos" si existe para portada
  const juegosLista = typeof juegos !== 'undefined' ? juegos : [];

  const itemsHTML = cart.map(item => {
    const codigo = codigos[String(item.id)] || '----- ----- -----';
    const juegoData = juegosLista.find(j => j.id === item.id);
    const thumb = juegoData && juegoData.portada
      ? juegoData.portada
      : 'img/ImagenesJuegos/ImagenesCaratulas/default.png';

    const nombre = item.nombre || (juegoData ? juegoData.nombre : 'Juego');

    return `
      <li class="codigo-item">
        <div class="nombre-juego">
          <img src="${thumb}" alt="Portada ${nombre}" width="40" height="40" style="border-radius:10px;object-fit:cover;">
          <span>${nombre}</span>
        </div>
        <div class="codigo-box">
          <span class="codigo" data-id="${item.id}">${codigo}</span>
          <button class="btn-copiar" type="button" onclick="copiarCodigo(this)" aria-label="Copiar código">
            <i class="fa-regular fa-copy"></i> Copiar
          </button>
        </div>
        <div class="badges">
          <span class="badge-mini">Digital</span>
        </div>
      </li>`;
  }).join('');

  wrapper.innerHTML = `
    <ul class="lista-codigos">
      ${itemsHTML}
    </ul>
    <div class="text-center mt-4 d-flex flex-column flex-sm-row justify-content-center gap-2">
    <a href="index.html" class="btn-codigos secundario" onclick="vaciarCarrito()">Volver a la tienda</a>

    </div>
  `;
}

// Copiar código
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

// Muestra / despliega el contenedor
function mostrarCodigos() {
  const wrapper = document.getElementById('codigos-wrapper');
  if (!wrapper) return;

  // Si ya está visible, no regeneramos (solo podrías alternar si quisieras)
  if (wrapper.classList.contains('abierto')) return;

  renderizarCodigos();
  wrapper.classList.remove('d-none');
  // Animación opcional
  requestAnimationFrame(() => {
    wrapper.classList.add('abierto', 'animar');
  });
}

// Preparar códigos al cargar (para que ya estén disponibles)
document.addEventListener('DOMContentLoaded', () => {
  prepararCodigosParaCarrito();
});