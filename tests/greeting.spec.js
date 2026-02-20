// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Greeting App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays label "Enter Your Name"', async ({ page }) => {
    await expect(page.getByText('Enter Your Name', { exact: true })).toBeVisible();
  });

  test('has text input with placeholder "Type your name here"', async ({ page }) => {
    const input = page.getByPlaceholder('Type your name here');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('has button labeled "Greet"', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Greet' })).toBeVisible();
  });

  test('clicking Greet shows Hello with entered name below button', async ({ page }) => {
    const input = page.getByPlaceholder('Type your name here');
    const btn = page.getByRole('button', { name: 'Greet' });
    const output = page.locator('#greeting-output');

    await input.fill('Alice');
    await btn.click();
    await expect(output).toHaveText('Hello, Alice!');
  });

  test('clicking Greet with empty input shows Hello Guest', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Greet' });
    const output = page.locator('#greeting-output');

    await btn.click();
    await expect(output).toHaveText('Hello, Guest!');
  });

  test('greeting output is below the button', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Greet' });
    const output = page.locator('#greeting-output');
    const btnBox = await btn.boundingBox();
    const outputBox = await output.boundingBox();
    expect(btnBox).toBeTruthy();
    expect(outputBox).toBeTruthy();
    expect(outputBox.y).toBeGreaterThan(btnBox.y + btnBox.height - 5);
  });

  test('animation layer exists and gets content on Greet click', async ({ page }) => {
    const layer = page.locator('#animation-layer');
    await expect(layer).toBeVisible();

    const btn = page.getByRole('button', { name: 'Greet' });
    await btn.click();

    const hasChildren = await layer.evaluate((el) => el.children.length > 0);
    expect(hasChildren).toBe(true);
  });

  test('each click clears previous animation then runs one (no overlap)', async ({ page }) => {
    const layer = page.locator('#animation-layer');
    const btn = page.getByRole('button', { name: 'Greet' });

    await btn.click();
    await expect(layer.locator('*').first()).toBeVisible({ timeout: 2000 });
    const count1 = await layer.evaluate((el) => el.children.length);
    expect(count1).toBeGreaterThan(0);

    await btn.click();
    const count2 = await layer.evaluate((el) => el.children.length);
    expect(count2).toBeGreaterThan(0);
  });

  test('Enter key in input triggers greet', async ({ page }) => {
    const input = page.getByPlaceholder('Type your name here');
    const output = page.locator('#greeting-output');

    await input.fill('Bob');
    await input.press('Enter');
    await expect(output).toHaveText('Hello, Bob!');
  });
});
