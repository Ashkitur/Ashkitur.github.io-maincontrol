

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('AimControlForms');
  const modalEl = document.getElementById('ModalForms');
  const modal = modalEl ? new bootstrap.Modal(modalEl) : null;

  // 1. Fecha máxima = hoy
  const birthDate = document.getElementById('birthDate');
  if (birthDate) {
    const today = new Date();
    birthDate.max = today.toISOString().split('T')[0];
  }

  // Helper notificación (simple console fallback; integra toastr si quieres)
  function notifyError(msg) {
    console.error(msg);
  }

  // 2. Validación / Submit
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validación HTML5
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      // bordes rojos manuales (por si quieres resaltarlo más)
      [...form.elements].forEach(el => {
        if (el instanceof HTMLElement && el.matches('.form-control, .form-select')) {
          if (!el.checkValidity()) el.classList.add('is-invalid'); else el.classList.remove('is-invalid');
        }
      });
      notifyError('Formulario con errores.');
      return;
    }

    // (Opcional) Validar reCAPTCHA
    const captchaOK = typeof grecaptcha === 'undefined'
      ? true  // Si no está integrado aún, pasamos true
      : !!grecaptcha.getResponse();

    if (!captchaOK) {
      notifyError('Por favor completa el reCAPTCHA.');
      return;
    }

    // 3. Volcar datos al modal
    const getVal = id => form.querySelector('#' + id)?.value || '';
    document.getElementById('modalEmail').textContent         = getVal('email');
    document.getElementById('modalName').textContent          = getVal('fullName');
    document.getElementById('modalBirthDate').textContent     = getVal('birthDate');
    document.getElementById('modalGender').textContent        = getVal('gender');
    document.getElementById('modalContactReason').textContent = getVal('contactReason');
    document.getElementById('modalOrderNumber').textContent   = getVal('orderNumber') || 'No especificado';
    document.getElementById('modalQueryType').textContent     = getVal('queryType');

    modal?.show();
    form.reset();
    form.classList.remove('was-validated');
    [...form.querySelectorAll('.is-invalid')].forEach(el => el.classList.remove('is-invalid'));
  });

  // Quitar marca de error al corregir campos
  form?.addEventListener('input', e => {
    const el = e.target;
    if (el instanceof HTMLElement && el.matches('.form-control, .form-select')) {
      if (el.checkValidity()) el.classList.remove('is-invalid');
    }
  });

});