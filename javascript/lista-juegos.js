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
  const juegosList = document.getElementById("juegos-list")
  juegosList.innerHTML = ""
data.forEach(juego => {
  const col = document.createElement("div")
  col.className = "col"

  col.innerHTML = `
 <div class="card h-100 d-flex flex-column shadow-sm" 
     style="
       background-color: black; 
       color: white; 
       border-radius: 33px; 
       overflow: hidden;
       transform: scale(0.9);   /* reduce al 90% */
       transform-origin: top center; /* mantiene centrado */
     ">

      <div style="padding: 10px; text-align: center;">
       <img src="${juego.portada}" 
     style="
       max-width: 100%;        /* no se pasa del ancho del contenedor */
       height: auto;           /* respeta el alto original */
       border: 3px solid #df6011; 
       border-radius: 22px; 
       display: block;
       margin: 0 auto;
     " 
     onerror="this.src='img/image-not-found.jpg';" 
     alt="Portada de ${juego.nombre}">

      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-left">${juego.nombre}</h5>
        <p class="card-text text-left"><b>Precio:</b> ₡${juego.precio}</p>
        <p class="card-text text-left"><b>Plataformas:</b> ${juego.plataformas.join(", ")}</p>
        
        <div class="mt-auto d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn" onclick="comprarJuegos(${juego.id})" style="background-color:#df6011; color:#fff; border-radius:15px; border:none;">
            <i class="bi bi-cart-plus"></i> Comprar
          </button>
          <button class="btn" onclick="detalleJuego(${juego.id})" data-id="${juego.id}" style="background-color:WHITE; color:BLACK; border-radius:15px; border:none;">
            <i class="bi bi-three-dots"></i> Detalle
          </button>
        </div>
      </div>
    </div>
  `
  juegosList.appendChild(col)
})


}

function comprarJuegos(juegoId) {
  alert("Juego agregado al carrito: " + juegoId)
  //dps poner function de agregar al carrito
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
