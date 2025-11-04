export const adminLogin = () => {
  cy.visit('/login');
  cy.get('input[name="username"]').type('dimas_admin2');
  cy.get('input[name="password"]').type('dimasarya');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
};
