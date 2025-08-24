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
<div class="cart-item  text-white">
  <div class="row align-items-center g-0 cart-item-row">
    <!-- Imagen -->
    <div class="col-auto col-img">
      <img src="${portada}" alt="${item.nombre}" class="thumb rounded">
    </div>

    <!-- Nombre -->
    <div class="col-7 col-sm-3 col-name">
      <span class="item-name text-truncate" title="${item.nombre}">${item.nombre}</span>
    </div>

    <!-- Cantidad (desktop) -->
    <div class="col-2 d-none d-sm-block">
      <input type="number"
             min="0"
             value="${quantity}"
             class="form-control form-control-sm text-center qty-input"
             data-id="${item.id}"
             oninput="this.value = this.value.replace(/[^0-9]/g,'');"
             onchange="cambiarCantidad(this)" />
    </div>

    <!-- Precio (desktop) -->
    <div class="col-2 d-none d-sm-flex justify-content-center">
      <span class="price">₡${price.toFixed(2)}</span>
    </div>

    <!-- Subtotal (desktop) -->
    <div class="col-2 d-none d-sm-flex justify-content-center">
      <span class="subtotal">₡${subtotal.toFixed(2)}</span>
    </div>

    <!-- Botón eliminar -->
    <div class="col-auto col-remove">
      <button type="button"
              class="btn btn-danger btn-sm remove-btn"
              onclick="eliminarItem(${item.id}) "
              aria-label="Eliminar ${item.nombre}">
        x
      </button>
    </div>

    <!-- Layout compacto (mobile) -->
    <div class="col-12 d-sm-none mt-2 mobile-details">
      <div class="d-flex align-items-stretch justify-content-between gap-2">
        <div class="flex-fill">
          <div class="mini-label">Cantidad</div>
          <input type="number"
                 min="0"
                 value="${quantity}"
                 class="form-control form-control-sm text-center qty-input"
                 data-id="${item.id}"
                 oninput="this.value = this.value.replace(/[^0-9]/g,'');"
                 onchange="cambiarCantidad(this)" />
        </div>
        <div class="text-end flex-fill">
          <div class="mini-label">Precio</div>
          <div class="price fw-semibold">₡${price.toFixed(2)}</div>
        </div>
        <div class="text-end flex-fill">
          <div class="mini-label">Subtotal</div>
            <div class="subtotal fw-semibold">₡${subtotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  </div>
</div>
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
       document.getElementById("total-neto").textContent = "₡0.00";
    }

    document.getElementById("detail").innerHTML = cartRowHTML;
   // document.getElementById("total-items").textContent = itemCount;
}

function cambiarCantidad(input) {
  const id = input.dataset.id;
  let carrito = getCart() || [];
  const index = carrito.findIndex(item => item.id == id);

  if (index !== -1) {
    const cantidad = parseInt(input.value, 10) || 0;

    if (cantidad <= 0) {
   
      carrito.splice(index, 1);
    } else {
   
      carrito[index].quantity = cantidad;
    }

    saveCart(carrito);

   
    showDetail();

    actualizarBotonProceder();
  }
}



function eliminarItem(idJuego) {
  let cartArray = getCart() || []; 

  if (cartArray.length > 0) {
    cartArray = cartArray.filter(item => item.id !== idJuego);

    saveCart(cartArray);  
    showDetail();          

    updateProceedButton(); 
  } else {
    
    saveCart([]);          
    showDetail();
    updateProceedButton();
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
