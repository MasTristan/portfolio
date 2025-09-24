const AUTO_INTERVAL = 5000;
const EXIT_DURATION = 500;
const ENTER_DURATION = 1000;

function clampIndex(index, length) {
  if (length === 0) return 0;
  const normalized = index % length;
  return normalized < 0 ? normalized + length : normalized;
}

export function initHeroCarousel() {
  const container = document.querySelector('[data-hero-carousel]');

  if (!container) {
    return;
  }

  const track = container.querySelector('[data-carousel-track]');
  const slides = Array.from(container.querySelectorAll('[data-slide]'));
  const dots = Array.from(container.querySelectorAll('[data-carousel-dot]'));
  const prevButton = container.querySelector('[data-carousel-prev]');
  const nextButton = container.querySelector('[data-carousel-next]');

  if (slides.length === 0) {
    return;
  }
  const allowAutoplay = slides.length > 1;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  activeIndex = activeIndex >= 0 ? activeIndex : 0;

  let timerId = null;
  const pauseReasons = new Set();

  function setSlideAttributes(slide, isActive) {
    slide.setAttribute('aria-hidden', String(!isActive));
    slide.setAttribute('tabindex', isActive ? '0' : '-1');
  }

  slides.forEach((slide, index) => {
    const isActive = index === activeIndex;
    if (isActive) {
      slide.classList.add('is-active');
    } else {
      slide.classList.remove('is-active');
    }
    slide.classList.remove('is-entering', 'is-exiting');
    setSlideAttributes(slide, isActive);
  });

  function updateDots() {
    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      if (isActive) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  }

  function clearTimer() {
    if (timerId) {
      window.clearTimeout(timerId);
      timerId = null;
    }
  }

  function updateProgress() {
    dots.forEach((dot) => {
      dot.style.removeProperty('--progress-duration');
      dot.classList.remove('is-progressing');
    });

    if (!allowAutoplay || pauseReasons.size > 0 || prefersReducedMotion) {
      return;
    }

    const activeDot = dots[activeIndex];
    if (!activeDot) {
      return;
    }

    void activeDot.offsetWidth;
    activeDot.style.setProperty('--progress-duration', `${AUTO_INTERVAL}ms`);
    activeDot.classList.add('is-progressing');
  }

  function scheduleNext() {
    clearTimer();
    if (!allowAutoplay || pauseReasons.size > 0) {
      return;
    }

    updateProgress();
    timerId = window.setTimeout(() => {
      goTo(activeIndex + 1);
    }, AUTO_INTERVAL);
  }

  function stopAutoplay(reason) {
    if (!allowAutoplay) {
      return;
    }

    if (reason) {
      pauseReasons.add(reason);
    }

    clearTimer();
    updateProgress();
  }

  function resumeAutoplay(reason) {
    if (!allowAutoplay) {
      return;
    }

    if (reason) {
      pauseReasons.delete(reason);
    }

    if (pauseReasons.size === 0) {
      scheduleNext();
    }
  }

  function getDirection(previousIndex, nextIndex) {
    if (previousIndex === nextIndex) {
      return 0;
    }

    if (nextIndex > previousIndex) {
      if (nextIndex - previousIndex === slides.length - 1) {
        return -1;
      }
      return 1;
    }

    if (previousIndex - nextIndex === slides.length - 1) {
      return 1;
    }

    return -1;
  }

  function animateTransition(previousIndex, nextIndex) {
    if (previousIndex === nextIndex) {
      return;
    }

    const previousSlide = slides[previousIndex];
    const nextSlide = slides[nextIndex];

    if (!previousSlide || !nextSlide) {
      return;
    }

    previousSlide.classList.remove('is-entering');
    nextSlide.classList.remove('is-entering', 'is-exiting', 'is-active');

    if (prefersReducedMotion) {
      previousSlide.classList.remove('is-active', 'is-exiting');
      nextSlide.classList.add('is-active');
      return;
    }

    const direction = getDirection(previousIndex, nextIndex) >= 0 ? 'forward' : 'backward';
    previousSlide.dataset.carouselDirection = direction;
    nextSlide.dataset.carouselDirection = direction;

    previousSlide.classList.add('is-exiting');
    nextSlide.classList.add('is-active', 'is-entering');

    window.setTimeout(() => {
      previousSlide.classList.remove('is-exiting', 'is-active');
      previousSlide.removeAttribute('data-carousel-direction');
    }, EXIT_DURATION);

    window.setTimeout(() => {
      nextSlide.classList.remove('is-entering');
      nextSlide.removeAttribute('data-carousel-direction');
    }, ENTER_DURATION);
  }

  function goTo(targetIndex, { focus = false } = {}) {
    const nextIndex = clampIndex(targetIndex, slides.length);

    if (nextIndex === activeIndex) {
      return;
    }

    const previousIndex = activeIndex;
    activeIndex = nextIndex;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      setSlideAttributes(slide, isActive);
    });

    animateTransition(previousIndex, activeIndex);
    updateDots();
    scheduleNext();

    if (focus) {
      const target = slides[activeIndex];
      if (target) {
        target.focus({ preventScroll: true });
      }
    }
  }

  function handlePrev(event) {
    const shouldFocus = event.detail === 0;
    stopAutoplay();
    goTo(activeIndex - 1, { focus: shouldFocus });
  }

  function handleNext(event) {
    const shouldFocus = event.detail === 0;
    stopAutoplay();
    goTo(activeIndex + 1, { focus: shouldFocus });
  }

  function handleDot(event, index) {
    const shouldFocus = event.detail === 0;
    stopAutoplay();
    goTo(index, { focus: shouldFocus });
  }

  function bindNavigation() {
    if (prevButton) {
      prevButton.addEventListener('click', handlePrev);
    }

    if (nextButton) {
      nextButton.addEventListener('click', handleNext);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', (event) => handleDot(event, index));
    });
  }

  function bindPauseInteractions() {
    container.addEventListener('mouseenter', () => stopAutoplay('hover'));
    container.addEventListener('mouseleave', () => resumeAutoplay('hover'));
    container.addEventListener('focusin', () => stopAutoplay('focus'));
    container.addEventListener('focusout', (event) => {
      if (!container.contains(event.relatedTarget)) {
        resumeAutoplay('focus');
      }
    });

    container.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') {
        stopAutoplay('touch');
      }
    });

    container.addEventListener('pointerup', (event) => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') {
        resumeAutoplay('touch');
      }
    });

    container.addEventListener('pointercancel', (event) => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') {
        resumeAutoplay('touch');
      }
    });
  }

  function initSwipe() {
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerActive = false;
    let pointerType = '';

    container.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') {
        return;
      }

      pointerType = event.pointerType;
      pointerActive = true;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      stopAutoplay('touch');
    });

    container.addEventListener('pointermove', (event) => {
      if (!pointerActive || (pointerType !== 'touch' && pointerType !== 'pen')) {
        return;
      }

      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 32) {
        if (deltaX > 0) {
          goTo(activeIndex - 1);
        } else {
          goTo(activeIndex + 1);
        }
        pointerActive = false;
        resumeAutoplay('touch');
      }
    });

    const endSwipe = (event) => {
      if (pointerActive && (event.pointerType === 'touch' || event.pointerType === 'pen')) {
        pointerActive = false;
        resumeAutoplay('touch');
      }
    };

    container.addEventListener('pointerup', endSwipe);
    container.addEventListener('pointercancel', endSwipe);
  }

  updateDots();
  bindNavigation();
  bindPauseInteractions();
  initSwipe();
  scheduleNext();

  if (track) {
    track.dataset.carouselReady = 'true';
  }

  const cleanup = () => {
    clearTimer();
  };

  container.addEventListener('carousel:destroy', cleanup, { once: true });
}
