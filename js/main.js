// ─── Partículas flutuantes ───
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor(W / 14);
  for (let i = 0; i < count; i++) {
    particles.push({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.25 + 0.05,
      drift: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.35 + 0.06,
      hue:   [270, 320, 45][Math.floor(Math.random() * 3)],
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.alpha})`;
    ctx.fill();

    p.y -= p.speed;
    p.x += p.drift;

    if (p.y < -4)    { p.y = H + 4; p.x = Math.random() * W; }
    if (p.x < -4)    p.x = W + 4;
    if (p.x > W + 4) p.x = -4;
  }
  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); createParticles(); });
resize();
createParticles();
draw();

// ─── Ripple ao clicar nos cards ───
document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size   = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY  - rect.top  - size / 2}px;
      background:rgba(255,255,255,0.07);
      transform:scale(0); animation:rippleAnim 0.5s ease-out forwards;
    `;
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});
