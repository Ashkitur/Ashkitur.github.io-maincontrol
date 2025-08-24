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
      if (!f) return;
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
  const cvv = document.getElementById('cvv'); // NUEVO

  numeroTarjeta?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,16);
    e.target.value = v.replace(/(\d{4})(?=\d)/g,'$1 ');
  });

  fecha?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,4);
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
  });

  // Control CVV: solo dígitos, máximo 3
  cvv?.addEventListener('input', e => {
    const soloDigitos = e.target.value.replace(/\D/g,'').slice(0,3);
    if (e.target.value !== soloDigitos) {
      e.target.value = soloDigitos;
    }
  });

  // (Opcional) Evitar tecleo de no dígitos (cubre antes de insertarse)
  cvv?.addEventListener('keydown', e => {
    // Permitir teclas de control
    const controlKeys = ['Backspace','Delete','Tab','ArrowLeft','ArrowRight','Home','End'];
    if (controlKeys.includes(e.key) || (e.ctrlKey || e.metaKey)) return;
    if (!/^\d$/.test(e.key) || e.target.value.length >= 3) {
      e.preventDefault();
    }
  });

  payBtn?.addEventListener('click', () => {
    const metodo = document.querySelector('input[name="metodo_pago"]:checked')?.value;
    const formActivo = forms[metodo];
    if (!formActivo) return;

    // Validación básica
    const requiredInputs = [...formActivo.querySelectorAll('input[required]')];
    let invalid = false;

    requiredInputs.forEach(inp => {
      const vacio = !inp.value.trim();
      // Validación específica para CVV
      if (inp.id === 'cvv') {
        const ok = /^\d{3}$/.test(inp.value);
        if (!ok) {
          invalid = true;
          inp.classList.add('is-invalid');
          return;
        }
      }
      if (vacio) {
        invalid = true;
        inp.classList.add('is-invalid');
      } else if (inp.id !== 'cvv') {
        inp.classList.remove('is-invalid');
      } else {
        inp.classList.remove('is-invalid');
      }
    });

    if (invalid) return;

    alert('Procesando pago con método: ' + metodo);

    localStorage.setItem('metodoPago', metodo);
    window.location.href = 'pagar.html';
  });
});