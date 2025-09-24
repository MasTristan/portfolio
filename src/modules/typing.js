let typingTimeout;

export function initTypingEffect(texts) {
  const typingEl = document.querySelector('.typing-text');
  const cursorEl = document.querySelector('.cursor');

  if (!typingEl || !cursorEl || !Array.isArray(texts) || texts.length === 0) {
    return;
  }

  stopTypingEffect();

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex] ?? '';

    if (isDeleting) {
      typingEl.textContent = currentText.substring(0, Math.max(0, charIndex - 1));
      charIndex -= 1;
    } else {
      typingEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex += 1;
    }

    let delay = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentText.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 500;
    }

    typingTimeout = window.setTimeout(type, delay);
  }

  typingEl.textContent = '';
  typingTimeout = window.setTimeout(type, 1000);
}

export function stopTypingEffect() {
  if (typingTimeout) {
    window.clearTimeout(typingTimeout);
    typingTimeout = undefined;
  }
}
