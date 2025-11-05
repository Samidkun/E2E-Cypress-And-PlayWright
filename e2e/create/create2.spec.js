import { test, expect } from '@playwright/test';

// CASE 2: Level kode < 3 huruf, nama level > 3 huruf
test.describe('Level CRUD - Create Level (Validasi Kode < 3 huruf)', () => {
  test('Harus gagal membuat Level jika kode < 3 huruf', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/login'); // Membuka halaman login
    await page.fill('input[name="username"]', 'satrio'); // isi username
    await page.fill('input[name="password"]', '123456'); // isi password
    await page.click('button[type="submit"]'); // Klik tombol login
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await expect(page).toHaveURL(/dashboard/);
    await page.goto('http://127.0.0.1:8000/level'); // Halaman Level
    await expect(page).toHaveURL(/level/);
    await page.getByRole('button', { name: /Tambah Level/i }).click(); // Klik tombol Tambah Level

    const levelCode = 'MS'; // Kode invalid (<3 huruf)
    const levelName = 'Manager SIB'; // Nama valid (>3 huruf)

    await page.fill('#level_kode', levelCode); // Isi form (kode level)
    await page.fill('#level_nama', levelName); // Isi form (kode nama)
    await page.waitForTimeout(2000); // menunggu

    // verifikasi data (tidak muncul & bertambah di CRUD)
    const table = page.locator('#table_level');
    await expect(table).not.toContainText(levelCode);
    await expect(table).not.toContainText(levelName);
  });
});