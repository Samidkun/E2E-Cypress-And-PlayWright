// e2e/login.spec.js
import { expect, test } from '@playwright/test';

test('Harus bisa login', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/login');
  await page.fill('input[name="username"]', 'satrio');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(2000);
  await page.waitForURL(/dashboard/, { timeout: 10000 });
  await expect(page).toHaveURL(/dashboard/);
});
