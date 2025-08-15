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

juegosList.style.display = "flex";
juegosList.style.justifyContent = "flex-start"; 

juegosList.style.gap = "28px 30px"; //hori y vert

juegos.forEach(juego => {
  const col = document.createElement("div");
  
  col.innerHTML = `
    <div class="card h-100 d-flex flex-column shadow-sm"
      style="background-color: black; color: white; border-radius: 33px; overflow: hidden; width: 100%; max-width: 650px; min-width: 290px; padding: 28px 24px 24px 24px; box-sizing: border-box;">
      <div style="padding: 0 0 20px 0; text-align: center;">
        <img src="${juego.portada}" 
          style="width: 100%; height: 400px; aspect-ratio: 15/9; object-fit: cover; border: 3px solid #df6011; border-radius: 22px; display: block; margin: 0 auto;"
          onerror="this.src='img/image-not-found.jpg';" alt="Portada de ${juego.nombre}">
      </div>
      <h5 class="card-title text-left" style="font-size: 1.7rem; min-height: 3.6em; line-height: 1.25em; overflow-wrap: break-word; word-break: break-word; margin-bottom: 22px;">${juego.nombre}</h5>
      <p class="card-text text-left" style="margin-bottom: 14px;"><b>Precio:</b> ₡${juego.precio}</p>
      <p class="card-text text-left" style="white-space: normal; overflow-wrap: break-word; word-break: break-word; margin-bottom: 22px;"><b>Plataformas:</b> ${juego.plataformas.join(", ")}</p>
      <div style="margin-top: auto; display: flex; gap: 16px; flex-wrap: wrap;">
        <button class="btn flex-fill" onclick="comprarJuegos(${juego.id})" style="background-color:#df6011; color:#fff; border-radius:15px; border:none; padding: 12px 18px; font-size: 1.05rem; min-width: 110px;">
          <i class="bi bi-cart-plus"></i> Comprar
        </button>
        <button class="btn flex-fill" onclick="detalleJuego(${juego.id})" data-id="${juego.id}" style="background-color:WHITE; color:BLACK; border-radius:15px; border:none; padding: 12px 18px; font-size: 1.05rem; min-width: 110px;">
          <i class="bi bi-three-dots"></i> Detalle
        </button>
      </div>
    </div>
  `;
  
  juegosList.appendChild(col);
});



}

function displayJuegosRandomTendencia(data){

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
