import { test, expect } from '@playwright/test';

// CASE 1: Berhasil menambah Level baru
test.describe('Level CRUD - Create Level', () => {
  test('should login and create a new level successfully', async ({ page }) => {

    await page.goto('http://127.0.0.1:8000/login'); // Membuka halaman login

    await page.fill('input[name="username"]', 'satrio'); // Mengisi username dan password
    await page.fill('input[name="password"]', '123456');

    await page.click('button[type="submit"]'); // Klik tombol login
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await expect(page).toHaveURL(/dashboard/);

    await page.goto('http://127.0.0.1:8000/level'); // Halaman Level
    await expect(page).toHaveURL(/level/);

    await page.getByRole('button', { name: /Tambah Level/i }).click(); // Klik tombol Tambah Level

    const levelName = 'Mahasiswa'; // Input Data
    const levelCode = levelName.replace(/\s+/g, '').substring(0, 3).toUpperCase();

    console.log(`Generated code: ${levelCode}`);

    expect(levelCode).toMatch(/^[A-Z]{3}$/); // Verifikasi kode valid

    await page.locator('#level_kode').fill(levelCode); // Isi form
    await page.locator('#level_nama').fill(levelName);

    const [response] = await Promise.all([ // Klik tombol Simpan dan tunggu respons berhasil
      page.waitForResponse(resp =>
        resp.url().includes('/level') && resp.status() === 200
      ),
      page.getByRole('button', { name: /Simpan/i }).click(),
    ]);

    console.log('Response status:', response.status());

    const swal = page.locator('.swal2-popup'); // VERIFIKASI SWEETALERT 
    await expect(swal).toBeVisible({ timeout: 10000 });

    const swalTitle = await page.locator('.swal2-title').innerText();
    const swalBody = await page.locator('.swal2-html-container').innerText();

    console.log('Swal title:', swalTitle, '| Swal body:', swalBody);

    expect(swalTitle).toMatch(/berhasil/i); // Verifikasi pesan sukses
    expect(swalBody).toMatch(/disimpan/i);

    const okButton = page.getByRole('button', { name: /OK/i }); // Tutup SweetAlert jika muncul tombol OK
    if (await okButton.isVisible()) {
      await okButton.click();
    }

    const table = page.locator('#table_level'); // VERIFIKASI DATA MUNCUL DI TABEL
    await expect(table).toContainText(levelCode);
    await expect(table).toContainText(levelName);
  });
});