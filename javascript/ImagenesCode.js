const popup = document.getElementById("popup");
const popupImage = document.getElementById("popupImage");
const close = document.getElementById("close");


document.querySelectorAll(".popup-img").forEach(img => {
  img.addEventListener("click", () => {
    popup.style.display = "flex";
    popupImage.src = img.src;
  });
});


close.addEventListener("click", () => {
  popup.style.display = "none";
});


popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
