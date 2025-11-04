describe('TC-002 | Login Password Salah', () => {
  it('Menolak login dengan password salah', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('dimas_admin2');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();
    cy.contains('Username atau Password salah').should('be.visible');
  });
});
