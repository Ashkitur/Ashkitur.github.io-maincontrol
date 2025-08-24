function showFacturaDetalle() {
  const tbody = document.getElementById("detalle-factura");
  if (!tbody) return;

  const cart = Array.isArray(getCart()) ? getCart() : [];
  const juegosLista = typeof juegos !== "undefined" ? juegos : [];


  const esc = str =>
    String(str).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));


  const formatCRC = v => {
    const n = Number(v) || 0;
    return '₡' + n.toFixed(2);
 
  };

  if (cart.length === 0) {
    tbody.innerHTML = `
      <tr class="table-empty">
        <td colspan="4" class="text-center py-4 text-white-50">
          No hay productos en el carrito
        </td>
      </tr>`;
    return;
  }

  const rows = cart.map(item => {
    const quantity = parseInt(item.quantity, 10) || 1;
    const price = parseFloat(item.precio) || 0;
    const subtotal = price * quantity;

    const producto = juegosLista.find(p => p.id === item.id);
    const portada = producto && producto.portada
      ? producto.portada
      : 'img/ImagenesJuegos/ImagenesCaratulas/default.png';

    return `
      <tr class="factura-row ">
        <!-- Nombre -->
        <td>
          <div class="d-flex align-items-center gap-2 factura-item-name">
            <img src="${esc(portada)}" alt="Portada ${esc(item.nombre)}" class="factura-thumb" loading="lazy" decoding="async">
            <span class="item-name text-truncate" title="${esc(item.nombre)}">${esc(item.nombre)}</span>
          </div>
        </td>
        <!-- Cantidad -->
        <td class="text-center fw-semibold">${quantity}</td>
        <!-- Precio unitario -->
        <td class="text-center">${formatCRC(price)}</td>
        <!-- Subtotal -->
        <td class="text-center fw-semibold">${formatCRC(subtotal)}</td>
      </tr>
    `;
  }).join("");

  tbody.innerHTML = rows;
}