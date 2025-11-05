
import { expect, test } from '@playwright/test';

test('Tidak Dapat Login Karena Password dan Username Tidak Sesuai', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/login');
  await page.fill('input[name="username"]', 'sarimin');
  await page.fill('input[name="password"]', '654321');
  await page.click('button[type="submit"]');

  await expect(page.getByText('Username atau Password salah')).toBeVisible();


  /*await page.waitForTimeout(2000);
  await page.waitForURL(/dashboard/, { timeout: 10000 });
  await expect(page).toHaveURL(/dashboard/);*/
});
