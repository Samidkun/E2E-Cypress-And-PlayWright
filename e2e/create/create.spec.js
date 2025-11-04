// @ts-check
import { test, expect } from '@playwright/test';

// CASE 1: Berhasil menambah Level baru
test.describe('Level CRUD - Create Level', () => {
  test('should login and create a new level successfully', async ({ page }) => {

    // Membuka halaman login
    await page.goto('http://127.0.0.1:8000/login');

    // Mengisi username dan password
    await page.fill('input[name="username"]', 'satrio');
    await page.fill('input[name="password"]', '123456');

    // Klik tombol login
    await page.click('button[type="submit"]');

    // Pastikan sudah masuk ke dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await expect(page).toHaveURL(/dashboard/);

    // Buka halaman Level
    await page.goto('http://127.0.0.1:8000/level');
    await page.waitForURL('**/level');

    // Klik tombol Tambah Level
    await page.getByRole('button', { name: /Tambah Level/i }).click();

    // Nama level (bisa kamu ganti sesuka hati)
    const levelName = 'Staff';

    // Generate kode otomatis dari nama level:
    // - Ambil 3 huruf pertama dari nama tanpa spasi
    // - Ubah ke huruf besar
    // - Tambahkan angka acak di belakang biar unik
    const cleanName = levelName.replace(/\s+/g, '');
    const levelCode = cleanName.substring(0, 3).toUpperCase() + Math.floor(Math.random());

    console.log('Generated code:', levelCode);

    // Verifikasi sebelum diisi
    expect(levelCode).toMatch(/^[A-Z]{3}\d$/);
    expect(levelName.length).toBeGreaterThan(3);

    // Isi form
    await page.locator('#level_kode').fill(levelCode);
    await page.locator('#level_nama').fill(levelName);

    // Klik tombol Simpan dan tunggu respon AJAX
    await Promise.all([
      page.waitForResponse(resp =>
        resp.url().includes('/level') && resp.status() === 200
      ),
      page.getByRole('button', { name: /Simpan/i }).click(),
    ]);

    // Tunggu SweetAlert muncul
    await page.waitForSelector('.swal2-title', { timeout: 10000 });

    // Ambil teks SweetAlert
    const swalTitle = await page.locator('.swal2-title').textContent();
    const swalBody = await page.locator('.swal2-html-container').textContent();

    console.log('Swal title:', swalTitle, '| Swal body:', swalBody);

    // Verifikasi pesan sukses
    await expect(swalTitle).toMatch(/berhasil/i);
    await expect(swalBody).toMatch(/Data level berhasil disimpan/i);

    // Verifikasi data muncul di tabel
    const table = page.locator('#table_level');
    await expect(table).toContainText(levelCode);
    await expect(table).toContainText(levelName);
  });
});