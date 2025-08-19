

// Obtiene el ID del juego desde la URL
function getGameIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id ? parseInt(id) : null;
}

// Busca el juego por su ID en el arreglo 'juegos'
function findGameById(gameId) {
  return juegos.find((juego) => juego.id === gameId);
}

// Muestra las reseñas/comentarios del juego
function displayResenas(gameId) {
  const juego = findGameById(gameId);

  if (!juego) {
    console.error("Juego no encontrado con ID:", gameId);
    return;
  }

  // Si no hay reseñas, muestra mensaje
  if (!juego.resenas || !juego.resenas.comentarios) {
    const resenasList = document.getElementById("ResenasIncluidas");
    resenasList.innerHTML =
      '<div class="col-12 text-center text-muted"><p>Aún no hay reseñas para este juego.</p></div>';
    return;
  }

  const resenasList = document.getElementById("ResenasIncluidas");
  const resenasGenerales = document.getElementById("ResenasGenerales");
  resenasList.innerHTML = "";

  // Calcula promedio de calificación y muestra resumen
  const comentarios = juego.resenas.comentarios;
  const totalResenas = comentarios.length;
  const promedioCalificacion =
    comentarios.reduce((sum, resena) => sum + resena.calificacion, 0) /
    totalResenas;
  const estrellasPromedio =
    "★".repeat(Math.floor(promedioCalificacion)) +
    "☆".repeat(5 - Math.floor(promedioCalificacion));
  if (resenasGenerales) {
    resenasGenerales.innerHTML = `
      <h1 class="fw-bold mb-0">${promedioCalificacion.toFixed(1)}</h1>
      <h4 class="mb-0">${estrellasPromedio}</h4>
      <h6 class="text-secondary">${totalResenas} Reseña${
      totalResenas !== 1 ? "s" : ""
    }</h6>
    `;
  }

  // Muestra cada comentario
  comentarios.forEach((resena) => {
    const col = document.createElement("div");
    col.classList.add("col-12");
    const estrellasLlenas = "★".repeat(resena.calificacion);
    const estrellasVacias = "☆".repeat(5 - resena.calificacion);

    col.innerHTML = `  
      <div class="p-3 rounded-4 shadow-lg text-white mb-3" style="background-color: #000;">
        <div class="d-flex align-items-center mb-2">
          <h5 class="mb-0 me-2" style="font-size: 1rem;">${resena.usuario}</h5>
          <div class="text-warning">${estrellasLlenas}${estrellasVacias}</div>
          <span class="ms-2" style="font-size: 0.9rem;">${resena.calificacion}/5</span>
        </div>
        <p class="mb-2" style="font-size: 0.9rem;">
          ${resena.texto}
        </p>
        <hr class="border-secondary">
      </div>
    `;
    resenasList.appendChild(col);
  });

  document.getElementById("ResenasIncluidas").style.display = "block";
}

// Carga todos los detalles del juego y las reseñas
function loadGameDetails() {
  const gameId = getGameIdFromURL();

  displayResenas(gameId);
  initializeCommentSystem();
}

// ==================== SISTEMA DE COMENTARIOS ====================

// Variable para la calificación seleccionada
let selectedRating = 3;

// Inicializa las estrellas para calificar
function initializeStars() {
  const stars = document.querySelectorAll(".star");
  const ratingValue = document.getElementById("rating-value");

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      updateStarsDisplay(index + 1);
    });

    star.addEventListener("click", () => {
      selectedRating = index + 1;
      updateStarsDisplay(selectedRating);
      if (ratingValue) ratingValue.textContent = selectedRating;
    });
  });

  const ratingContainer = document.querySelector(".rating");
  if (ratingContainer) {
    ratingContainer.addEventListener("mouseleave", () => {
      updateStarsDisplay(selectedRating);
    });
  }

  updateStarsDisplay(selectedRating);
  if (ratingValue) ratingValue.textContent = selectedRating;
}

// Actualiza el color de las estrellas según la calificación
function updateStarsDisplay(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.style.color = index < rating ? "#ffc107" : "#6c757d";
  });
}

// Agrega un comentario al juego
function addComment(nombre, texto, calificacion) {
  const gameId = getGameIdFromURL();
  const juego = findGameById(gameId);

  if (!juego) return false;
  if (!nombre || nombre.trim().length < 2) return false;
  if (!texto || texto.trim().length < 10) return false;
  if (calificacion < 1 || calificacion > 5) return false;

  if (!juego.resenas) {
    juego.resenas = { comentarios: [] };
  }
  if (!juego.resenas.comentarios) {
    juego.resenas.comentarios = [];
  }

  const nuevoComentario = {
    usuario: nombre.trim(),
    texto: texto.trim(),
    calificacion: parseInt(calificacion),
  };

  juego.resenas.comentarios.push(nuevoComentario);
  return true;
}

// Maneja el envío del formulario de reseña
function handleSubmitReview() {
  const nombreInput = document.querySelector('#reviewCard input[type="text"]');
  const textoTextarea = document.querySelector("#reviewCard textarea");

  if (!nombreInput || !textoTextarea) return;

  const nombre = nombreInput.value;
  const texto = textoTextarea.value;
  const calificacion = selectedRating;

  if (addComment(nombre, texto, calificacion)) {
    nombreInput.value = "";
    textoTextarea.value = "";
    selectedRating = 3;
    updateStarsDisplay(3);
    document.getElementById("rating-value").textContent = "3";

    // Oculta el formulario si se usa Bootstrap Collapse
    const reviewCard = document.getElementById("reviewCard");
    if (reviewCard && typeof bootstrap !== "undefined") {
      const collapse = new bootstrap.Collapse(reviewCard, { toggle: false });
      collapse.hide();
    }

    // Actualiza la lista de reseñas
    const gameId = getGameIdFromURL();
    displayResenas(gameId);
  }
}

// Inicializa el sistema de comentarios (estrellas, botón, textarea)
function initializeCommentSystem() {
  initializeStars();

  // Botón de enviar reseña
  const submitBtn = document.querySelector("#reviewCard .btn-orange");
  if (submitBtn) {
    submitBtn.replaceWith(submitBtn.cloneNode(true));
    const newSubmitBtn = document.querySelector("#reviewCard .btn-orange");
    newSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleSubmitReview();
    });
  }

  // Permite enviar reseña con Ctrl+Enter
  const textarea = document.querySelector("#reviewCard textarea");
  if (textarea) {
    textarea.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleSubmitReview();
      }
    });
  }
}

// ==================== INICIALIZACIÓN ====================

// Cuando la página carga, muestra los detalles del juego
document.addEventListener("DOMContentLoaded", () => {
  loadGameDetails();
});

// Por si el estado de la página ya está listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadGameDetails);
} else {
  loadGameDetails();
}
