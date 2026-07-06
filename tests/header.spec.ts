import { test, expect } from '@playwright/test';

test('header screenshot and visibility', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const header = page.getByText('Swag Labs');
  await expect(header).toBeVisible();
  await header.screenshot({ path: 'screenshots/header.png' });
});
