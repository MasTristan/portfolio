const AUTO_INTERVAL = 5000;
const SLIDE_DURATION = 600;
const SLIDE_EASING = 'cubic-bezier(0.33, 1, 0.68, 1)';

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
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = motionQuery.matches;
  let removeMotionChangeListener = null;

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
    slide.classList.remove('is-entering', 'is-exiting', 'is-transitioning');
    setSlideAttributes(slide, isActive);
  });

  function resetSlideAnimationState(slide) {
    slide.classList.remove('is-entering', 'is-exiting', 'is-transitioning');
    slide.style.removeProperty('transform');
    slide.style.removeProperty('opacity');
  }

  function cancelSlideAnimations(slide) {
    slide.getAnimations().forEach((animation) => {
      animation.cancel();
    });
    resetSlideAnimationState(slide);
  }

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

    cancelSlideAnimations(previousSlide);
    cancelSlideAnimations(nextSlide);

    previousSlide.classList.remove('is-entering');
    nextSlide.classList.remove('is-entering', 'is-exiting');

    if (prefersReducedMotion) {
      previousSlide.classList.remove('is-active', 'is-transitioning', 'is-exiting');
      nextSlide.classList.add('is-active');
      return;
    }

    const direction = getDirection(previousIndex, nextIndex) >= 0 ? 1 : -1;

    previousSlide.classList.add('is-transitioning', 'is-exiting');
    nextSlide.classList.add('is-transitioning', 'is-entering', 'is-active');

    const sharedOptions = {
      duration: SLIDE_DURATION,
      easing: SLIDE_EASING,
      fill: 'none',
    };

    const previousKeyframes =
      direction >= 0
        ? [
            { transform: 'translateX(0%)', opacity: 1 },
            { transform: 'translateX(-100%)', opacity: 1 },
          ]
        : [
            { transform: 'translateX(0%)', opacity: 1 },
            { transform: 'translateX(100%)', opacity: 1 },
          ];

    const nextKeyframes =
      direction >= 0
        ? [
            { transform: 'translateX(100%)', opacity: 1 },
            { transform: 'translateX(0%)', opacity: 1 },
          ]
        : [
            { transform: 'translateX(-100%)', opacity: 1 },
            { transform: 'translateX(0%)', opacity: 1 },
          ];

    const previousAnimation = previousSlide.animate(previousKeyframes, sharedOptions);
    const nextAnimation = nextSlide.animate(nextKeyframes, sharedOptions);

    const handlePreviousEnd = () => {
      previousSlide.classList.remove('is-active', 'is-transitioning', 'is-exiting');
      resetSlideAnimationState(previousSlide);
    };

    const handleNextEnd = () => {
      nextSlide.classList.remove('is-transitioning', 'is-entering');
      resetSlideAnimationState(nextSlide);
    };

    previousAnimation.addEventListener('finish', handlePreviousEnd, { once: true });
    previousAnimation.addEventListener('cancel', handlePreviousEnd, { once: true });
    nextAnimation.addEventListener('finish', handleNextEnd, { once: true });
    nextAnimation.addEventListener('cancel', handleNextEnd, { once: true });
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
      if (prefersReducedMotion) {
        slide.classList.toggle('is-active', isActive);
      }
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
    if (removeMotionChangeListener) {
      removeMotionChangeListener();
    }
    slides.forEach((slide) => cancelSlideAnimations(slide));
  };

  function handleMotionChange(event) {
    prefersReducedMotion = event.matches;

    if (prefersReducedMotion) {
      clearTimer();
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        cancelSlideAnimations(slide);
        slide.classList.toggle('is-active', isActive);
        setSlideAttributes(slide, isActive);
      });
      updateProgress();
    } else {
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        cancelSlideAnimations(slide);
        slide.classList.toggle('is-active', isActive);
        setSlideAttributes(slide, isActive);
      });
      scheduleNext();
    }
  }

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', handleMotionChange);
    removeMotionChangeListener = () => motionQuery.removeEventListener('change', handleMotionChange);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(handleMotionChange);
    removeMotionChangeListener = () => motionQuery.removeListener(handleMotionChange);
  }

  container.addEventListener('carousel:destroy', cleanup, { once: true });
}
