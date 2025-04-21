const { test, expect } = require('@playwright/test');

test.describe('Frontend Testing', () => {

  test('Homepage should contain the correct title and welcome message', async ({ page }) => {
    await page.goto('https://testing-xlem.onrender.com/'); // Updated URL
    await expect(page).toHaveTitle(/Automation Testing UI/i);
    await expect(page.locator('h1')).toHaveText(/Automation Testing Playground/);
  });

  test('Basic form elements should be interactive', async ({ page }) => {
    await page.goto('https://testing-xlem.onrender.com/'); // Updated URL
    await expect(page.locator('input#nameInput')).toBeVisible();
    await expect(page.locator('button')).toHaveText('Click Me');

    // Interact with the name input and button
    await page.fill('input#nameInput', 'John Doe');
    await page.click('button');
    await expect(page.locator('input#nameInput')).toHaveValue('John Doe');
  });

  test('Checkbox should toggle on click', async ({ page }) => {
    await page.goto('https://testing-xlem.onrender.com/'); // Updated URL
    const checkbox = page.locator('input#acceptTerms');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('Form should submit and show validation message', async ({ page }) => {
    await page.goto('https://testing-xlem.onrender.com/'); // Updated URL
    await page.fill('input#emailInput', 'test@example.com');
    await page.selectOption('select#dropdown', '1');
    await page.click('button[type="submit"]');
    const message = await page.locator('#formMessage');
    await expect(message).toContainText('Form submitted successfully'); // Adjust based on your implementation
  });

  test('Data table should display fetched data', async ({ page }) => {
    await page.goto('https://testing-xlem.onrender.com/'); // Updated URL
    await page.waitForSelector('table#dataTable');
    const rows = await page.locator('table#dataTable tbody tr');
    await expect(rows).toHaveCountGreaterThan(0);
  });

  test('Chart should render correctly', async ({ page }) => {
    await page.goto('https://testing-xlem.onrender.com/'); // Updated URL
    const chart = page.locator('#myChart');
    await expect(chart).toBeVisible();
    const chartCanvas = await chart.evaluate(el => el.getContext('2d'));
    await expect(chartCanvas).toBeTruthy();
  });

});
