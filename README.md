# Greeting Web Application

A modern, centered greeting app with a label, name input, Greet button, and dynamic greeting. Each Greet click triggers one random background animation (confetti, party popper, or glowing burst). Animations clear before the next run so they never overlap.

## Project structure

```
greeting-app/
├── index.html          # Main page
├── css/
│   └── styles.css      # Layout and animation styles
├── js/
│   └── app.js          # Greeting and animation logic
├── tests/
│   ├── verify-requirements.js   # Node-based requirement checks (no install)
│   └── greeting.spec.js        # Playwright E2E tests
├── package.json
├── playwright.config.js
└── README.md
```

## Requirements verified

- **UI:** Label "Enter Your Name", text input (placeholder "Type your name here"), button "Greet", greeting shown below button.
- **Behavior:** Click Greet → show "Hello, &lt;name&gt;!" (or "Hello, Guest!" if empty). Enter key also triggers greet.
- **Animations:** Three effects (confetti, party popper, glowing burst). One random animation per click; previous animation is cleared before the next runs.

## Commands

### 1. Run requirement verification (no install)

From the project folder:

```bash
node tests/verify-requirements.js
```

Expected: All requirement checks passed.

### 2. Install dependencies and run E2E tests

```bash
cd greeting-app
npm install
npx playwright install chromium
npm test
```

### 3. Run the app

```bash
npm start
```

Then open **http://localhost:3000** in your browser.

### 4. Build

Static app; no build step. Use `npm start` to serve.
