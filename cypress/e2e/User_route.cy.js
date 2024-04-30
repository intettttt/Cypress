describe('User', () => {
    it('Successfully retrieve user information', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_users_api_users__get')
      cy.request('https://mariancure-backend.vercel.app/api/users/').then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length.above(0)
      })
  })

  it('Successfully retrieve user information by ID', () => {
    cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_users__user_id__get')

    cy.request({
      method: 'GET',
      url: 'https://mariancure-backend.vercel.app/api/users/3',
    }).then((response) => {
      // Assert that the request was successful
      expect(response.status).to.equal(200);

      expect(response.body).to.have.property('username', "VAlvarez");
      expect(response.body).to.have.property('user_id', 3);
      expect(response.body).to.have.property('role_id', 1);
      expect(response.body).to.have.property('role_name', "Patient");
      expect(response.body).to.have.property('pharmacist_id', null);
      expect(response.body).to.have.property('pharmacist_name', null);
    });
  })

  it('Successfully add a new user account.', () => {

    const string = `{
      "username": "Princess",
      "full_name": "Intet",
      "role_name": "Patient",
      "password": "Intet123"
    }`;
  
    
    cy.visit('https://mariancure-backend.vercel.app/docs#/Users/add_user_api_add_user_post')
    cy.get('.try-out > .btn').click();
    cy.get('.body-param__text').each(($el) => {
      cy.wrap($el).clear(); // Clear each text box
    });

    cy.get('.body-param__text').eq(0).type(string);
   
    cy.get('.execute-wrapper > .btn').click();
    cy.intercept('POST', '/add_user').as('apiRequest');

});
  ;
});
