describe('Read Cashier', () => {
    it('GET users route', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_users_api_users__get')
      cy.request('https://mariancure-backend.vercel.app/api/users/').then((response)=>{
  expect(response.status).to.eq(200)
  expect(response.body).to.have.length.above(0)
      })
  })

  it(' Find a user by ID', () => {
    cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_users__user_id__get')

    cy.request({
      method: 'GET',
      url: 'https://mariancure-backend.vercel.app/api/users/3',
    }).then((response) => {
      // Assert that the request was successful
      expect(response.status).to.equal(200);

      // Assert that the response contains the expected user ID
      expect(response.body).to.have.property('username', "VAlvarez");

      // Assert that the response contains the expected username
      expect(response.body).to.have.property('user_id', 3);
      expect(response.body).to.have.property('role_id', 1);
      expect(response.body).to.have.property('role_name', "Patient");
      expect(response.body).to.have.property('pharmacist_id', null);
      expect(response.body).to.have.property('pharmacist_name', null);
    });

  });
})
