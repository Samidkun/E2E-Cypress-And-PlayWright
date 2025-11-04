import { test, expect } from '@playwright/test';

// CASE: Level kode 3 huruf, nama level < 3 huruf
test.describe('Level CRUD - Create Level (Validasi Nama < 3 huruf)', () => {
  test('Harus gagal membuat Level jika nama level < 3 huruf', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000/login'); // buka halaman login
    await page.fill('input[name="username"]', 'satrio'); // isi username
    await page.fill('input[name="password"]', '123456'); // isi password
    await page.click('button[type="submit"]'); // klik tombol login
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await expect(page).toHaveURL(/dashboard/);
    await page.goto('http://127.0.0.1:8000/level'); // buka halaman Level
    await expect(page).toHaveURL(/level/); // pastikan URL halaman Level
    await page.getByRole('button', { name: /Tambah Level/i }).click(); // tombol Tambah Level

    // isi dari form data (invalid)
    const levelCode = `L${Date.now()}`.substring(0,3).toUpperCase(); 
    const levelName = 'IT'; // Nama invalid (<3 huruf) => IT (Information Technology)
    await page.fill('#level_kode', levelCode); // isi kode level
    await page.fill('#level_nama', levelName); // isi nama level
    await page.getByRole('button', { name: /Simpan/i }).click(); // verifikasi tombol simpan 
    await page.waitForTimeout(10000); // menunggu

    // verifikasi data 
    const table = page.locator('#table_level'); // pilih tabel level
    await expect(table).not.toContainText(levelCode); 
    await expect(table).not.toContainText(levelName); 
  });
});