test('Homepage should contain welcome message', async ({ page }) => {
  await page.goto('https://testing-xlem.onrender.com/index', { timeout: 60000 }); // Increase timeout to 60 seconds
  await expect(page).toHaveTitle(/Automation Testing UI/i);
  await expect(page.locator('h1')).toHaveText(/Automation Testing Playground/);
});

