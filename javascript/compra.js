function saveCart(cartArray) {
    localStorage.setItem("compra", JSON.stringify(cartArray))
    console.log("Carrito guardado: ", cartArray)


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
