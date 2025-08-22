function showDetail() {
    let cartRowHTML = '';
    let itemCount = 0;
    let total = 0;
    const impuestoPorcentaje = 0.13; // 13%
    let impuesto = 0; // aquí guardamos el valor del impuesto

    const cart = getCart();
    if(cart.length > 0) {
        itemCount = cart.length;

        cart.forEach(item => {
            const quantity = parseInt(item.quantity) || 1;
            const price = parseFloat(item.precio) || 0;
            const subtotal = price * quantity;

            //consulto desde el json, comparo id y tomo la portada
            const producto = juegos.find(p => p.id === item.id);
            const portada = producto ? producto.portada : 'img/ImagenesJuegos/ImagenesCaratulas/default.png';

                       cartRowHTML += `
<div class="row mb-4 d-flex align-items-center">

    <!-- Imagen del producto -->
    <div class="col-md-3 col-lg-3 col-xl-3 d-flex justify-content-start">
        <img src="${portada}" 
             alt="${item.nombre}" 
             class="img-fluid rounded" 
             style="width: 80px; height: 80px; object-fit: cover;">
    </div>

    <!-- Nombre del producto -->
    <div class="col-md-6 col-lg-6 col-xl-5 d-flex align-items-center">
        <h6 class="text-white name-juego fs-5 mb-0 ms-3">${item.nombre}</h6>
    </div>

    <!-- Cantidad -->
    <div class="col-md-3 col-lg-2 col-xl-2 d-flex">
        <input type="number" min="0" value="${quantity}" 
               class="form-control form-control-sm" 
               data-id="${item.id}" onchange="cambiarCantidad(this)" />
    </div>

    <!-- Precio -->
    <div class="col-md-3 col-lg-2 col-xl-2">
        <h6 class="mb-0 price-juego fs-5 text-white"> Precio: &cent;${price.toFixed(2)}</h6>
    </div>

    <!-- Subtotal -->
    <div class="col-md-3 col-lg-2 col-xl-2">
        <h6 class="mb-0 subtotal-juego fs-5 text-white">Total: &cent;${subtotal.toFixed(2)}</h6>
    </div>

    <!-- Botón eliminar -->
    <div class="col-md-0 col-lg-1 col-xl-1"> 
        <button type="button" class="btn btn-danger btn-sm" onclick="eliminarItem(${item.id})">Eliminar</button> 
    </div>
</div>
<hr class="my-4">`;

            total += subtotal;
        });

        impuesto = total * impuestoPorcentaje; //calcular impuesto
        const totalConImpuesto = total + impuesto;

      
        document.getElementById("impuesto-acobrar").textContent = "₡" + impuesto.toFixed(2);
        document.getElementById("total-neto").textContent = "₡" + total.toFixed(2);
        document.getElementById("total-compra").textContent = "₡" + totalConImpuesto.toFixed(2);

    } else {
        cartRowHTML = `<h5>No hay productos en el carrito</h5>`;
        document.getElementById("impuesto-acobrar").textContent = "₡0.00";
        document.getElementById("total-compra").textContent = "₡0.00";
    }

    document.getElementById("detail").innerHTML = cartRowHTML;
    document.getElementById("total-items").textContent = itemCount;
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
