document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  if (!idParam) {
    juegoNoEncontrado();
    return;
  }

  const juego = juegos.find((j) => j.id == idParam);
  if (!juego) {
    juegoNoEncontrado();
    return;
  }

  console.log("Juego encontrado", juego);

  document.getElementById("title").textContent = juego.nombre;

  const img = document.getElementById("image");
  if (juego.portada) {
    img.src = juego.portada;
    img.alt = juego.nombre;
  }

  document.getElementById("price").textContent = "₡" + juego.precio;

  const descripcion = document.getElementById("descripcion");
  if (descripcion) {
    descripcion.textContent = juego.descripcion || "Sin descripción";
  } else {
    console.warn("⚠️ Elemento con id 'descripcion' no encontrado");
  }

  const burbujitas = document.getElementById("plataformas");
  burbujitas.innerHTML = "";

  juego.plataformas.forEach((plataforma) => {
    const div = document.createElement("div");
    div.classList.add("burbujita");
    div.textContent = plataforma;
    burbujitas.appendChild(div);
  });

  document.getElementById("disponibilidad").textContent =
    juego.disponibilidad || "No disponible";
  document.getElementById("stock").textContent = juego.stock
    ? "En stock"
    : "Agotado";

  const contenedor = document.getElementById("contenedorImagenesExtra");
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popupImage");
  const close = document.getElementById("close");

  if (contenedor) {
    contenedor.innerHTML = "";

    if (juego.imagenes && juego.imagenes.length > 0) {
      juego.imagenes.forEach((src) => {
        // Crear columna
        const col = document.createElement("div");
        col.classList.add("col-4");

        const imgGaleria = document.createElement("img");
        imgGaleria.src = src;
        imgGaleria.alt = juego.nombre;
        imgGaleria.classList.add("img-fluid", "rounded", "popup-img");

        col.appendChild(imgGaleria);

        contenedor.appendChild(col);
      });
    } else {
      contenedor.textContent = "Sin imágenes adicionales";
    }
  }

  if (contenedor) {
    contenedor.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup-img")) {
        popup.style.display = "flex";
        popupImage.src = e.target.src;
      }
    });
  }

  if (close) {
    close.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }

  const reseñasContainer = document.getElementById("resenas");
  if (reseñasContainer) {
    reseñasContainer.innerHTML = "";
    if (juego.resenas?.comentarios?.length > 0) {
      juego.resenas.comentarios.forEach((comentario) => {
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
