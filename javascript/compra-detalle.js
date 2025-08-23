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
<div class="row mb-3 align-items-center text-center">
    <!-- Imagen -->
    <div class="col-2">
        <img src="${portada}" alt="${item.nombre}" class="img-fluid rounded" style="width: 50px; height: 70px; object-fit: cover;">
    </div>
    <!-- Nombre -->
    <div class="col-4 d-flex align-items-center justify-content-center">
        <span class="text-white">${item.nombre}</span>
    </div>
    <!-- Cantidad -->
    <div class="col-2">
        <input type="number" min="0" value="${quantity}" 
               class="form-control form-control-sm text-center" 
               data-id="${item.id}" 
               oninput="this.value = this.value.replace(/[^0-9]/g,'');" 
               onchange="cambiarCantidad(this)" />
    </div>
    <!-- Precio -->
    <div class="col-2 d-flex align-items-center justify-content-center">
        <span class="text-white">₡${price.toFixed(2)}</span>
    </div>
    <!-- Subtotal -->
    <div class="col-2 d-flex align-items-center justify-content-center">
        <span class="text-white">₡${subtotal.toFixed(2)}</span>
    </div>
</div>
<hr class="my-2">
`;


            total += subtotal;
        });

        impuesto = total * impuestoPorcentaje; //calcular impuesto
        const totalConImpuesto = total + impuesto;

      
        document.getElementById("impuesto-acobrar").textContent = "₡" + impuesto.toFixed(2);
        document.getElementById("total-neto").textContent = "₡" + total.toFixed(2);
        document.getElementById("total-compra").textContent = "₡" + totalConImpuesto.toFixed(2);

    } else {
        cartRowHTML = `<h5 style="color: white;">No hay productos en el carrito</h5>`;
        document.getElementById("impuesto-acobrar").textContent = "₡0.00";
        document.getElementById("total-compra").textContent = "₡0.00";
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
