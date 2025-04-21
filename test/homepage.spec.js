const { test, expect } = require('@playwright/test');

test('Homepage should contain welcome message', async ({ page }) => {
  await page.goto('https://testing-xlem.onrender.com/index');
  await expect(page).toHaveTitle(/Automation Testing UI/i);
  await expect(page.locator('h1')).toHaveText(/MAutomation Testing Playground/); // adjust if your h1 is different
});
