/**
 * Requirement verification script - runs without Playwright.
 * Run: node tests/verify-requirements.js
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
let failed = 0;

function check(name, condition) {
  if (condition) {
    console.log('  ✓ ' + name);
    return true;
  }
  console.log('  ✗ ' + name);
  failed++;
  return false;
}

function read(file) {
  return fs.readFileSync(path.join(projectRoot, file), 'utf8');
}

console.log('Verifying greeting app requirements...\n');

const html = read('index.html');
const css = read('css/styles.css');
const js = read('js/app.js');

console.log('1. UI elements in index.html');
check('Label "Enter Your Name" present', html.includes('Enter Your Name'));
check('Input with placeholder "Type your name here"', html.includes('Type your name here'));
check('Button labeled "Greet"', /Greet/.test(html) && html.includes('id="greet-btn"'));
check('Greeting output element below button (output#greeting-output)', html.includes('id="greeting-output"'));
check('Name input has id="name-input"', html.includes('id="name-input"'));

console.log('\n2. Greeting behavior in js/app.js');
check('Greet button click handler', js.includes('greet-btn') && js.includes('addEventListener'));
check('Display "Hello" with name', js.includes('Hello') && js.includes('greeting-output'));
check('Empty name shows Guest', js.includes('Guest'));

console.log('\n3. Animations (3 types, random, no overlap)');
check('Animation layer cleared before run', js.includes('clearAnimations') && js.includes('innerHTML'));
check('Confetti animation', js.includes('runConfetti') || js.includes('confetti'));
check('Party popper animation', js.includes('runPopper') || js.includes('popper'));
check('Glowing burst animation', js.includes('runGlowBurst') || js.includes('glow'));
check('Random choice of one animation', js.includes('Math.floor(Math.random()'));
check('Clear after duration (no overlap)', js.includes('setTimeout(clearAnimations'));

console.log('\n4. CSS animations');
check('Confetti keyframes or class', css.includes('confetti') && (css.includes('@keyframes') || css.includes('animation')));
check('Popper keyframes or class', css.includes('popper'));
check('Glow burst keyframes or class', css.includes('glow-burst') || css.includes('glow-burst-anim'));

console.log('\n5. Layout');
check('Centered layout (flex or center)', css.includes('center') || css.includes('flex'));
check('Card/container styling', css.includes('card') || css.includes('main'));

if (failed > 0) {
  console.log('\n' + failed + ' check(s) failed.');
  process.exit(1);
}
console.log('\nAll requirement checks passed.');
process.exit(0);
