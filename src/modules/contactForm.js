function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormStatus(statusEl, type, message) {
  if (!statusEl) {
    return;
  }

  statusEl.className = `form-status ${type}`;
  statusEl.innerHTML = message;

  if (type === 'success' || type === 'error') {
    setTimeout(() => {
      statusEl.className = 'form-status';
      statusEl.innerHTML = '';
    }, 5000);
  }
}

export function initContactForm(translate) {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('form-status');

  if (!form || !statusEl) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const subject = (formData.get('subject') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    const errors = [];

    if (!name) {
      errors.push(translate('form-error-name'));
    }

    if (!email) {
      errors.push(translate('form-error-email'));
    } else if (!isValidEmail(email)) {
      errors.push(translate('form-error-email-invalid'));
    }

    if (!subject) {
      errors.push(translate('form-error-subject'));
    }

    if (!message) {
      errors.push(translate('form-error-message'));
    }

    if (errors.length > 0) {
      showFormStatus(statusEl, 'error', errors.join('<br>'));
      return;
    }

    showFormStatus(statusEl, 'loading', translate('form-loading'));

    setTimeout(() => {
      showFormStatus(statusEl, 'success', translate('form-success'));
      form.reset();
    }, 2000);
  });
}
