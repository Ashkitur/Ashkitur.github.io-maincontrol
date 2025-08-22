function showDetail() {
    let cartRowHTML = '';
    let itemCount = 0;
    let total = 0;

    const cart = getCart();
    if(cart.length > 0) {
        itemCount = cart.length;

        cart.forEach(item => {
            const quantity = parseInt(item.quantity) || 1;
            const price = parseFloat(item.precio) || 0;
            const subtotal = price * quantity;

           cartRowHTML += `
    <div class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-3 col-lg-3 col-xl-3">
            <h6 class="text-white name-juego fs-4">${item.nombre}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
          <input type="number" min="0" value="${quantity}" 
                    class="form-control form-control-sm" 
                    data-id="${item.id}" onchange="cambiarCantidad(this)" />
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h6 class="mb-0 price-juego fs-5">&cent; ${price.toFixed(2)}</h6>
        </div>
        
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h6 class="mb-0 subtotal-juego fs-5">&cent; ${subtotal.toFixed(2)}</h6>
        </div>
        <div class="col-md-0 col-lg-1 col-xl-1"> <button type="button" class="btn btn-danger btn-sm" onclick="eliminarItem(${item.id})"> Eliminar Producto </button> </div>
    </div>
    <hr class="my-4">`;

            total += subtotal;
        });
    } else {
        cartRowHTML = `<p>No hay productos en el carrito</p>`;
    }

    document.getElementById("detail").innerHTML = cartRowHTML;
    document.getElementById("total-items").textContent = itemCount;
    document.getElementById("total-compra").textContent = "₡" + total.toFixed(2);
}

function cambiarCantidad(input) {
    const id = input.dataset.id;
    let carrito = getCart();
    const index = carrito.findIndex(item => item.id == id);

    if (index !== -1) {
        const cantidad = parseInt(input.value, 10);

        if (cantidad <= 0) {
         
             carrito.splice(index, 1);
            
        } else {
            carrito[index].quantity = cantidad;
        
        }

        saveCart(carrito);
        showDetail();
    }
}



function eliminarItem(idJuego){
    let cartArray = getCart();
    if(cartArray.length > 0){
        cartArray = cartArray.filter(item => item.id !== idJuego);
      
        saveCart(cartArray);
        showDetail();
    } else {
        

    }
}

function updateCartItemQty(element) {
    const idJuego = element.dataset.id;
    const newQuantity = parseInt(element.value, 10);
    if (isNaN(newQuantity) || newQuantity <= 0) {
        toastr.warning("Cantidad inválida, mínimo 1","Advertencia");
        showDetail(); //recarga para mostrar la cantidad correcta
        return;
    }

    let cartArray = getCart();
    const index = cartArray.findIndex(item => item.id == idJuego);
    if(index !== -1){
        cartArray[index].quantity = newQuantity;
        saveCart(cartArray);
        showDetail();
        toastr.success(`Cantidad de "${cartArray[index].nombre}" actualizada a ${newQuantity}`,"Carrito Actualizado");
    }
}
