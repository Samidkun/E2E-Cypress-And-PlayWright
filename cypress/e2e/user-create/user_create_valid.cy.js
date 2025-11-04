describe('TC-005 | Create User Valid', () => {
  it('Menambahkan user baru dengan data valid', () => {
    // STEP 1: Login dulu
    cy.visit('/login');
    cy.get('input[name="username"]').type('dimas_admin2');  // ganti sesuai akun admin kamu
    cy.get('input[name="password"]').type('dimasarya');     // password-nya juga sesuaikan
    cy.get('button[type="submit"]').click();

    // pastikan redirect berhasil
    cy.url().should('include', '/dashboard');
    cy.contains('Data User').should('be.visible');

    // STEP 2: Baru masuk ke halaman user
    cy.visit('/user');
    cy.contains('Tambah User').click();

    // isi form
    cy.get('.modal.show select[name="level_id"]').select('Administrator');
    cy.get('.modal.show input[name="username"]').type('test');
    cy.get('.modal.show input[name="nama"]').type('User CRUD Testing');
    cy.get('.modal.show input[name="password"]').type('12345678');
    cy.get('.modal.show').contains('Simpan').click();

    // validasi popup
    cy.get('.swal2-popup', { timeout: 8000 }).should('contain', 'Berhasil');
    cy.get('.swal2-popup').should('contain', 'Data user berhasil disimpan');

    // validasi data masuk tabel
    cy.get('#table_user').should('contain', 'test_crud');
  });
});
