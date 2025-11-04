import { expect, test } from '@playwright/test';

test('Tidak dapat login jika username dan password kosong', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/login');

  // Klik tombol login tanpa isi apa pun
  await page.click('button[type="submit"]');

  // Ambil elemen input
  const usernameInput = page.locator('input[name="username"]');
  const passwordInput = page.locator('input[name="password"]');

  // Pastikan keduanya ada di halaman
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  // ✅ Cek validasi bawaan HTML5 (required)
  const usernameValid = await usernameInput.evaluate(el => el.checkValidity());
  const passwordValid = await passwordInput.evaluate(el => el.checkValidity());

  expect(usernameValid).toBeFalsy();
  expect(passwordValid).toBeFalsy();

  // Pastikan tetap di halaman login (tidak redirect)
  await expect(page).toHaveURL(/\/login$/);
});
