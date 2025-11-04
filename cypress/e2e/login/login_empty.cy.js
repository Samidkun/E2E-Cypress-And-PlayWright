describe('TC-003 | Login field kosong', () => {
  it('Menampilkan alert HTML5 saat field kosong', () => {
    cy.visit('/login');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="username"]')
      .then(($input) => {
        expect($input[0].validationMessage)
          .to.eq('Please fill out this field.');
      });
  });
});
