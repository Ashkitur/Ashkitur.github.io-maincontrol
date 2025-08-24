function showFacturaDetalle() {
    let cartRowHTML = '';
    const cart = getCart();

    if(cart.length > 0) {
        cart.forEach(item => {
            const quantity = parseInt(item.quantity) || 1;
            const price = parseFloat(item.precio) || 0;
            const subtotal = price * quantity;

            // Consultar portada del producto
            const producto = juegos.find(p => p.id === item.id);
            const portada = producto ? producto.portada : 'img/ImagenesJuegos/ImagenesCaratulas/default.png';

            cartRowHTML += `
<div class="cart-item text-white">
  <div class="row align-items-center g-0 cart-item-row">
    <!-- Nombre -->
    <div class="col-7 col-sm-5 col-name">
      <span class="item-name text-truncate" title="${item.nombre}">${item.nombre}</span>
    </div>
    <!-- Cantidad -->
    <div class="col-2 d-flex justify-content-center">
      <span class="quantity">x${quantity}</span>
    </div>
    <!-- Precio -->
    <div class="col-2 d-flex justify-content-center">
      <span class="price">₡${price.toFixed(2)}</span>
    </div>
    <!-- Subtotal -->
    <div class="col-2 d-flex justify-content-center">
      <span class="subtotal">₡${subtotal.toFixed(2)}</span>
    </div>
  </div>
</div>
`;
        });
    } else {
        cartRowHTML = `<h5 style="color: white;">No hay productos en el carrito</h5>`;
    }

    document.getElementById("detalle-factura").innerHTML = cartRowHTML;
}



function mostrarMetodoPago(metodoPago) {
    const metodoPagoElemento = document.getElementById("metodo-pago-factura");
    if (metodoPagoElemento) {
        metodoPagoElemento.textContent = metodoPago;
    }
}
