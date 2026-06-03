// Signature hero visual — the credit loss / default distribution curve.
//
// Draws a right-skewed loss distribution (the canonical economic-capital
// picture) as a hairline behind the editorial hero: a soft navy area fill,
// a gold regulatory-capital threshold (VaR · 99.9%) and a gold-tinted tail
// (the unexpected loss capital must absorb). It breathes slowly and, on a
// fine pointer, the threshold eases toward the cursor — a quiet "what-if VaR".
//
// Purely decorative (aria-hidden). Honours prefers-reduced-motion with a
// single static frame, reads its palette from the CSS custom properties so
// light/dark "just work", and pauses when scrolled offscreen.

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SUPPORTS_HOVER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// A few plausible distribution shapes the curve lerps between, so the shape
// "recalculates" organically rather than jittering randomly. Each shape is an
// asymmetric bell: a short left flank and a long right tail (the heavy tail
// the regulatory capital must absorb). Peak sits left-of-centre by design.
const SHAPES = [
  { peak: 0.40, wL: 0.12, wR: 0.30 },
  { peak: 0.38, wL: 0.13, wR: 0.34 },
  { peak: 0.43, wL: 0.11, wR: 0.27 },
];

// Asymmetric gaussian density in normalised x∈[0,1], peak normalised to 1.
function makeDensity(samples) {
  return (p) => {
    const ys = new Array(samples + 1);
    for (let i = 0; i <= samples; i++) {
      const x = i / samples;
      const w = x < p.peak ? p.wL : p.wR;
      ys[i] = Math.exp(-((x - p.peak) ** 2) / (2 * w * w));
    }
    return ys;
  };
}

export function initRiskCurve() {
  const canvas = document.querySelector('[data-risk-curve]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const SAMPLES = 220;
  const density = makeDensity(SAMPLES);

  let W = 0;
  let H = 0;
  let raf = null;
  let running = false;
  let t = 0;
  // Threshold position (fraction of width). Lerps toward pointer on desktop.
  let thr = 0.8;
  let thrTarget = 0.8;
  let cur = { ...SHAPES[0] };
  let target = { ...SHAPES[0] };
  let shapeIndex = 0;

  const colors = {
    stroke: '#1c2c54',
    fillTop: 'rgba(28,44,84,0.10)',
    gold: '#a87a2e',
    goldSoft: 'rgba(168,122,46,0.14)',
    muted: 'rgba(122,122,133,0.0)',
  };

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const get = (n, fallback) => (cs.getPropertyValue(n).trim() || fallback);
    colors.stroke = get('--accent-color', '#1c2c54');
    colors.fillTop = get('--accent-soft', 'rgba(28,44,84,0.08)');
    colors.gold = get('--accent-gold', '#a87a2e');
    colors.goldSoft = get('--accent-gold-soft', 'rgba(168,122,46,0.14)');
  }

  const dpr = () => Math.min(2, window.devicePixelRatio || 1);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    const ratio = dpr();
    canvas.width = Math.round(W * ratio);
    canvas.height = Math.round(H * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function lerp(a, b, k) { return a + (b - a) * k; }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const ys = density(cur);
    const baseY = H * 1.0;
    const amp = H * 0.46;
    const xAt = (i) => (i / SAMPLES) * W;
    const yAt = (i) => baseY - ys[i] * amp;

    // ── Area fill under the whole curve (soft navy → transparent) ──
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let i = 0; i <= SAMPLES; i++) ctx.lineTo(xAt(i), yAt(i));
    ctx.lineTo(W, baseY);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, baseY - amp, 0, baseY);
    grad.addColorStop(0, colors.fillTop);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // ── Tail risk fill (gold), clipped to x > threshold ──
    const thrX = thr * W;
    ctx.save();
    ctx.beginPath();
    ctx.rect(thrX, 0, W - thrX, H);
    ctx.clip();
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let i = 0; i <= SAMPLES; i++) ctx.lineTo(xAt(i), yAt(i));
    ctx.lineTo(W, baseY);
    ctx.closePath();
    ctx.fillStyle = colors.goldSoft;
    ctx.fill();
    ctx.restore();

    // ── The curve hairline ──
    ctx.beginPath();
    for (let i = 0; i <= SAMPLES; i++) {
      const x = xAt(i);
      const y = yAt(i);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = colors.stroke;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // ── Regulatory capital threshold (gold vertical rule) ──
    // find curve y at threshold for a neat capped line
    const ti = Math.round(thr * SAMPLES);
    const tyOnCurve = yAt(Math.min(SAMPLES, Math.max(0, ti)));
    ctx.beginPath();
    ctx.moveTo(thrX, baseY);
    ctx.lineTo(thrX, Math.min(tyOnCurve, baseY) - 6);
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = colors.gold;
    ctx.setLineDash([4, 4]);
    ctx.globalAlpha = 0.85;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // small mono labels
    ctx.fillStyle = colors.gold;
    ctx.globalAlpha = 0.8;
    ctx.font = '500 11px ui-monospace, "IBM Plex Mono", monospace';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('VaR · 99.9%', thrX + 8, Math.min(tyOnCurve, baseY) - 12);
    ctx.globalAlpha = 1;
  }

  function frame() {
    if (!running) return;
    t += 1;
    // breathe: ease current shape toward target; rotate target periodically
    cur.peak = lerp(cur.peak, target.peak, 0.015);
    cur.wL = lerp(cur.wL, target.wL, 0.015);
    cur.wR = lerp(cur.wR, target.wR, 0.015);
    if (t % 360 === 0) {
      shapeIndex = (shapeIndex + 1) % SHAPES.length;
      target = { ...SHAPES[shapeIndex] };
    }
    // ease threshold toward pointer target
    thr += (thrTarget - thr) * 0.06;
    draw();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || REDUCED_MOTION) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  readColors();
  resize();

  if (REDUCED_MOTION) {
    // single settled frame, no loop, no pointer
    cur = { ...SHAPES[0] };
    draw();
  } else {
    start();
  }

  // Pause when the hero scrolls offscreen.
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      if (visible) start();
      else stop();
    },
    { threshold: 0 },
  );
  io.observe(canvas);

  // Resize handling.
  const ro = new ResizeObserver(() => {
    resize();
    if (REDUCED_MOTION || !running) draw();
  });
  ro.observe(canvas);

  // Pointer-driven threshold (desktop only).
  if (SUPPORTS_HOVER && !REDUCED_MOTION) {
    window.addEventListener(
      'pointermove',
      (e) => {
        const frac = e.clientX / window.innerWidth;
        thrTarget = Math.min(0.92, Math.max(0.55, 0.55 + frac * 0.37));
      },
      { passive: true },
    );
  }

  // Re-read palette when the theme toggles.
  const mo = new MutationObserver(() => {
    readColors();
    if (REDUCED_MOTION || !running) draw();
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
