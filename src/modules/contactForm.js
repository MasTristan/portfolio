const STATUS_AUTO_DISMISS_MS = 5000;
const FAKE_SUBMIT_DELAY_MS = 2000;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearStatus(statusEl) {
  statusEl.className = 'form-status';
  statusEl.replaceChildren();
}

function showFormStatus(statusEl, type, messages) {
  if (!statusEl) {
    return;
  }

  const list = Array.isArray(messages) ? messages : [messages];

  statusEl.className = `form-status ${type}`;
  statusEl.replaceChildren(
    ...list.map((text) => {
      const line = document.createElement('div');
      line.className = 'form-status-line';
      line.textContent = text;
      return line;
    }),
  );

  if (type === 'success' || type === 'error') {
    setTimeout(() => clearStatus(statusEl), STATUS_AUTO_DISMISS_MS);
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

    // Honeypot: real users never see or fill this field; bots usually do.
    if ((formData.get('_gotcha') || '').toString().trim() !== '') {
      form.reset();
      return;
    }

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
      showFormStatus(statusEl, 'error', errors);
      return;
    }

    showFormStatus(statusEl, 'loading', translate('form-loading'));

    setTimeout(() => {
      showFormStatus(statusEl, 'success', translate('form-success'));
      form.reset();
    }, FAKE_SUBMIT_DELAY_MS);
  });
}
