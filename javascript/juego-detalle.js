document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  if (!idParam) {
    juegoNoEncontrado();
    return;
  }
 
  const juego = juegos.find(j => j.id == idParam);
  if (!juego) {
    juegoNoEncontrado();
    return;
  }
  
  console.log("Juego encontrado", juego);
  
  document.getElementById("title").textContent = juego.nombre;
  document.getElementById("price").textContent = "₡" + juego.precio;
  document.getElementById("descripcion").textContent = juego.descripcion || "Sin descripción";
  

  document.getElementById("plataformas").textContent = juego.plataformas.join(", ") || "Sin plataformas";
  

  document.getElementById("disponibilidad").textContent = juego.disponibilidad || "No disponible";
  document.getElementById("stock").textContent = juego.stock ? "En stock" : "Agotado";
  

  document.getElementById("envio-tiempo").textContent = juego.envio?.tiempoEstimado || "N/A";
  document.getElementById("envio-costo").textContent = juego.envio?.costo === 0 ? "Gratis" : "₡" + juego.envio?.costo;
  

  const img = document.getElementById("image");
  if (juego.portada) {
    img.src = juego.portada;
    img.alt = juego.nombre;
  }
  
  
  const galeria = document.getElementById("galeria");
  if (galeria) {
    galeria.innerHTML = "";
    if (juego.imagenes && juego.imagenes.length > 0) {
      juego.imagenes.forEach(src => {
        const imgGaleria = document.createElement("img");
        imgGaleria.src = src;
        imgGaleria.alt = juego.nombre;
        imgGaleria.style.width = "100px";
        imgGaleria.style.marginRight = "5px";
        galeria.appendChild(imgGaleria);
      });
    } else {
      galeria.textContent = "Sin imágenes adicionales";
    }
  }
  
 
  const reseñasContainer = document.getElementById("resenas");
  if (reseñasContainer) {
    reseñasContainer.innerHTML = "";
    if (juego.resenas?.comentarios?.length > 0) {
      juego.resenas.comentarios.forEach(comentario => {
        const div = document.createElement("div");
        div.classList.add("comentario");
        div.innerHTML = `<strong>${comentario.usuario}:</strong> ${comentario.texto} <em>(${comentario.calificacion} ⭐)</em>`;
        reseñasContainer.appendChild(div);
      });
    } else {
      reseñasContainer.textContent = "Sin reseñas";
    }
  }
});

function juegoNoEncontrado() {
  document.getElementById("detalle").classList.add("d-none");
  document.getElementById("alertNotFound").classList.remove("d-none");
}