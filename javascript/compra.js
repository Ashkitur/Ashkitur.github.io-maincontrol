function saveCart(cartArray) {
    localStorage.setItem("compra", JSON.stringify(cartArray))
    console.log("Carrito guardado: ", cartArray)


}

function vaciarCarrito() {
  let cartArray = getCart() || [];

  if (cartArray.length > 0) {
    // Recorremos todos los items solo para iterar (opcional)
    cartArray.forEach(item => {
      console.log(`Eliminando item id: ${item.id}`);
    });

    // Vaciar el carrito
    cartArray = [];
    saveCart(cartArray);

    // Refrescar la UI
    showDetail();
    updateProceedButton();
  } else {
    // Si ya estaba vacío
    saveCart([]);
    showDetail();
    updateProceedButton();
  }
}



function getCart() {
    const cart = localStorage.getItem("compra")
    return cart ? JSON.parse(cart) : []
}
function addToCart(idJuego) {

    const idJuegoNum = parseInt(idJuego);

    const Juego = juegos.find((b) => b.id == idJuegoNum);

    const carItem = {
        id: Juego.id,
        nombre: Juego.nombre,
        precio: Juego.precio,
        quantity: 1
    };

    let cartArray = getCart();

    const indexItem = cartArray.findIndex((juego) => juego.id === idJuegoNum);

    if (indexItem !== -1) {
        cartArray[indexItem].quantity += 1;
        alert(`${carItem.nombre} agregado al carrito. Cantidad: ${cartArray[indexItem].quantity}`);
    } else {
        cartArray.push(carItem);
        alert(`${carItem.nombre} agregado al carrito`);
    }

    saveCart(cartArray);
    saveCart(cartArray);
}
