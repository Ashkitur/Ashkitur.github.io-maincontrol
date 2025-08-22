function saveCart(cartArray) {
    localStorage.setItem("compra", JSON.stringify(cartArray))
    console.log("Carrito guardado: ", cartArray)


}




function getCart() {
    const cart = localStorage.getItem("compra")
    return cart ? JSON.parse(cart) : []
}

function addToCart(idJuego) {

    const Juego = juegos.find((b) => b.id == idJuego)
  
    const carItem = {
        id: Juego.id,
        nombre: Juego.nombre,
        precio: Juego.precio,
        img: Juego.portada
    }

    let cartArray = getCart()
    const indexItem = cartArray.findIndex((juego) => juego.id === idJuego)

if(indexItem !== -1){
         alert(`"${carItem.nombre}" agregado al carrito`);
        cartArray[indexItem].quantity+=1
    }else{
     
        cartArray.push(carItem)
       alert(`"${carItem.nombre}" agregado al carrito`);
    }
    saveCart(cartArray)
}


