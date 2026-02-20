(function () {
  const ANIMATION_DURATION_MS = 2500;
  const CONFETTI_COUNT = 60;
  const POPPER_COUNT = 40;
  const ANIMATION_IDS = ['confetti', 'popper', 'glow'];

  const input = document.getElementById('name-input');
  const greetBtn = document.getElementById('greet-btn');
  const output = document.getElementById('greeting-output');
  const animationLayer = document.getElementById('animation-layer');

  function clearAnimations() {
    animationLayer.innerHTML = '';
  }

  function runConfetti() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const colors = ['#7c5cff', '#ff6b9d', '#ffd93d', '#6bcb77', '#4d96ff', '#ff8c42'];

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = centerX + (Math.random() - 0.5) * 200 + 'px';
      piece.style.top = centerY + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
      piece.style.animationDelay = Math.random() * 0.3 + 's';
      piece.style.setProperty('--angle', (Math.random() * 360) + 'deg');
      animationLayer.appendChild(piece);
    }
  }

  function runPopper() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const colors = ['#7c5cff', '#ff6b9d', '#ffd93d', '#6bcb77'];

    for (let i = 0; i < POPPER_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / POPPER_COUNT + Math.random() * 0.5;
      const dist = 300 + Math.random() * 400;
      const endX = Math.cos(angle) * dist;
      const endY = Math.sin(angle) * dist;

      const particle = document.createElement('div');
      particle.className = 'popper-particle';
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.setProperty('--popper-end', `translate(${endX}px, ${endY}px) rotate(${angle * 180}deg)`);
      particle.style.animationDuration = (0.8 + Math.random() * 0.4) + 's';
      particle.style.animationDelay = Math.random() * 0.1 + 's';
      animationLayer.appendChild(particle);
    }
  }

  function runGlowBurst() {
    const burst = document.createElement('div');
    burst.className = 'glow-burst';
    animationLayer.appendChild(burst);
  }

  function triggerRandomAnimation() {
    clearAnimations();
    const id = ANIMATION_IDS[Math.floor(Math.random() * ANIMATION_IDS.length)];
    if (id === 'confetti') runConfetti();
    else if (id === 'popper') runPopper();
    else runGlowBurst();

    setTimeout(clearAnimations, ANIMATION_DURATION_MS);
  }

  function greet() {
    const name = (input.value || '').trim();
    const displayName = name || 'Guest';
    output.textContent = 'Hello, ' + displayName + '!';
    triggerRandomAnimation();
  }

  greetBtn.addEventListener('click', greet);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') greet();
  });
})();
