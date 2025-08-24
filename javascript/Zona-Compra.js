document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="metodo_pago"]');
  const forms = {
    tarjeta: document.getElementById('form-tarjeta'),
    paypal: document.getElementById('form-paypal'),
    movil: document.getElementById('form-movil')
  };
  const payBtn = document.getElementById('boton-pagar');

  function mostrarForm(valor){
    Object.entries(forms).forEach(([k, f]) => {
      if (k === valor){
        f.classList.add('activo');
        f.classList.remove('d-none');
      } else {
        f.classList.remove('activo');
        f.classList.add('d-none');
      }
    });
  }

  radios.forEach(r => {
    r.addEventListener('change', e => mostrarForm(e.target.value));
  });

  // Formato simple para número de tarjeta y fecha
  const numeroTarjeta = document.getElementById('numero-tarjeta');
  const fecha = document.getElementById('fecha-expiracion');

  numeroTarjeta?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,16);
    e.target.value = v.replace(/(\d{4})(?=\d)/g,'$1 ');
  });

  fecha?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,4);
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
  });

  payBtn?.addEventListener('click', () => {
  const metodo = document.querySelector('input[name="metodo_pago"]:checked')?.value;
  const formActivo = forms[metodo];
  if (!formActivo) return;

  // Validación básica
  const invalid = [...formActivo.querySelectorAll('input[required]')]
    .some(inp => !inp.value.trim());

  if (invalid) {
    formActivo.querySelectorAll('input[required]').forEach(inp => {
      if (!inp.value.trim()) inp.classList.add('is-invalid');
      else inp.classList.remove('is-invalid');
    });
    return;
  }

  alert('Procesando pago con método: ' + metodo);

  // Guardamos el método de pago en localStorage
  localStorage.setItem('metodoPago', metodo);

  // Redirigimos a la página de la factura
  window.location.href = 'pagar.html';
});

});