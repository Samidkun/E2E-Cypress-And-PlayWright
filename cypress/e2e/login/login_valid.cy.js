describe('TC-001 | Login Valid', () => {
  it('Harus bisa login dengan kredensial benar', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('dimas_admin2');
    cy.get('input[name="password"]').type('dimasarya');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Selamat Datang').should('be.visible');
  });
});
