document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const plataforma = urlParams.get("plataforma") || "all";

  let juegosFiltrados;
  if (plataforma === "all") {
    juegosFiltrados = juegos;
  } else {
    juegosFiltrados = juegos.filter(juego => 
      juego.plataformas.includes(plataforma)
    );
  }

  displayJuegos(juegosFiltrados);
});



function displayJuegos(data) {
  const juegosList = document.getElementById("juegos-list");
  juegosList.innerHTML = "";

  juegosList.style.display = "flex";
  juegosList.style.flexWrap = "wrap";
  juegosList.style.justifyContent = "flex-start";
  juegosList.style.gap = "30px 30px"; // Espacio entre tarjetas

  data.forEach(juego => { 
    const col = document.createElement("div");
    col.style.flex = "1 1 calc(25% - 30px)"; // 4 por fila, resta el gap
    col.style.maxWidth = "calc(25% - 30px)";
    col.style.minWidth = "260px"; // Opcional: para responsividad

   
    col.classList.add("animate__animated", "animate__fadeInUp");

    col.innerHTML = `
      <div class="card h-100 d-flex flex-column shadow-lg juego-item"
        style="background-color: #121212; color: white; border-radius: 28px; overflow: hidden; width: 100%; max-width: 100%; min-width: 220px; padding: 20px; box-sizing: border-box;">
        <!-- Portada -->
        <div class="text-center mb-3">
          <img src="${juego.portada}" 
               class="img-fluid"
               style="width: 100%; height: 380px; aspect-ratio: 16/9; object-fit: cover; border: 3px solid #df6011; border-radius: 20px;"
               onerror="this.src='img/image-not-found.jpg';" alt="Portada de ${juego.nombre}">
        </div>
        <!-- Título -->
        <h5 class="card-title fw-bold mb-2" 
            style="font-size: 1.6rem; line-height: 1.3; word-break: break-word;">
          ${juego.nombre}
        </h5>
        <!-- Info -->
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <p class="mb-1"><b><i class="bi bi-controller"></i> Plataforma:</b> ${juego.plataformas.join(", ")}</p>
          <p class="mb-1 text-warning fw-bold" style="font-size: 1.1rem;">
            <i class="bi bi-cash-coin"></i> ₡${juego.precio}
          </p>
        </div>
        <!-- Botones -->
        <div class="mt-auto d-flex gap-3 flex-wrap">
          <button class="btn flex-fill fw-semibold"
                  onclick="comprarJuegos(${juego.id})"
                  style="background-color:#df6011; color:#fff; border-radius:15px; padding: 12px 18px; font-size: 1.05rem; transition: 0.3s;">
            <i class="bi bi-cart-plus"></i> Comprar
          </button>
          <button class="btn flex-fill fw-semibold"
                  onclick="detalleJuego(${juego.id})" data-id="${juego.id}"
                  style="background-color:#fff; color:#121212; border-radius:15px; padding: 12px 18px; font-size: 1.05rem; transition: 0.3s;">
            <i class="bi bi-three-dots"></i> Detalle
          </button>
        </div>
      </div>
    `;

    juegosList.appendChild(col);
  });
}


function displayJuegosRandomTendencia(data) {
  const juegosList = document.getElementById("juegos-list");
  juegosList.innerHTML = "";

  // Determina cuántos juegos mostrar (por ejemplo, entre 4 y 8)
  const cantidad = Math.min(8, Math.max(4, Math.floor(Math.random() * data.length)));
  const usados = new Set();
  const juegosRandom = [];

  while (juegosRandom.length < cantidad && usados.size < data.length) {
    const idx = Math.floor(Math.random() * data.length);
    if (!usados.has(idx)) {
      usados.add(idx);
      juegosRandom.push(data[idx]);
    }
  }

  displayJuegos(juegosRandom);
}

function comprarJuegos(juegoId) {
  addToCart(juegoId);

  const $card = $(`.juego-item button[onclick="comprarJuegos(${juegoId})"]`).closest(".juego-item");
  const $title = $card.find('.juego-nombre'); 

  console.log("Nombre juego: ", $title.text());

  // Cambiar el fondo temporalmente
  $card.css("background-color", "rgba(190, 190, 190, 1)");
  setTimeout(() => {
    $card.css("background-color", "black"); // vuelve al color original
  }, 500);

 
}


function detalleJuego(id) {
  window.location.href = `detalle-juego.html?id=${id}`
}

function displayPlataforma() {
  const select = document.getElementById("filter")
  select.innerHTML = ""

  const allOption = document.createElement("option")
  allOption.value = "all"
  allOption.textContent = "Todas las plataformas"
  select.appendChild(allOption)

  const plataformas = new Set()
  juegos.forEach(juego => {
    juego.plataformas.forEach(plataforma => {
      plataformas.add(plataforma)
    })
  })

  plataformas.forEach(plataforma => {
    const option = document.createElement("option")
    option.value = plataforma
    option.textContent = plataforma
    select.appendChild(option)
  })
}
