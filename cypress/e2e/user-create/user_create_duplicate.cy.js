describe('TC-006 | Create User Duplicate', () => {
  it('Menampilkan error saat username duplikat', () => {

    // === STEP 1: Login dulu ===
    cy.visit('/login');
    cy.get('input[name="username"]').type('dimas_admin2'); // sesuaikan dengan akun admin kamu
    cy.get('input[name="password"]').type('dimasarya');
    cy.get('button[type="submit"]').click();

    // pastikan redirect berhasil
    cy.url().should('include', '/dashboard');
    cy.contains('Data User').should('be.visible');

    // === STEP 2: Kunjungi halaman user ===
    cy.visit('/user');
    cy.contains('Tambah User').click();

    // === STEP 3: Isi form dengan username yang sudah ada ===
    cy.get('.modal.show select[name="level_id"]').select('Administrator');
    cy.get('.modal.show input[name="username"]').type('test'); // username yang SUDAH ada
    cy.get('.modal.show input[name="nama"]').type('User CRUD Testing');
    cy.get('.modal.show input[name="password"]').type('12345678');
    cy.get('.modal.show').contains('Simpan').click();

    // === STEP 4: Validasi muncul alert error ===
    cy.get('.swal2-popup', { timeout: 8000 })
      .should('contain', 'Error')
      .and('contain', 'Username sudah terdaftar'); // sesuaikan dengan teks dari backend-mu

  });
});
