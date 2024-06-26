describe('User Test Routes', () => {
  describe('User', () => {
    it('Successfully retrieve user information', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_users_api_users__get')
      cy.get('.btn').click();
      cy.get('.execute-wrapper > .btn').click();

      cy.request('https://mariancure-backend.vercel.app/api/users/').then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length.above(0)

      cy.wait(8000);
      })
  })
})

  describe('User_ID', () => {
    it('Successfully retrieve user information by ID', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_users__user_id__get')
      cy.get('.btn').click();
      cy.get('input').eq(0).type("1");
      cy.get('.execute-wrapper > .btn').click();
      
      cy.request({
        method: 'GET',
        url: 'https://mariancure-backend.vercel.app/api/users/1',
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
      cy.wait(5000);
    })
  })

  describe('Add_User', () => {
    it('1. Successfully add a new user account.', () => {
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

      cy.wait(5000);
      });;

    it('2. Error handling for duplicate user details.', () => {
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

      cy.wait(5000);
    })
    });

  describe('Update Password', () => {
    it('1. Succesfully retrieve user information', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/update_user_password_api_update_password_put')
      cy.get('.btn').click();
      cy.get('[data-param-name="username"] > .parameters-col_description > input').type('VALvarez');
      cy.get('[data-param-name="password"] > .parameters-col_description > input').type('Patient1234');
      cy.get('.execute-wrapper > .btn').click();

      cy.request('https://mariancure-backend.vercel.app/api/concerns/').then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length.above(0)
      cy.wait(8000);
    })
  })
    it('2. Failed due to incorrect credentials.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/update_user_password_api_update_password_put')
      cy.get('.btn').click();
      cy.get('[data-param-name="username"] > .parameters-col_description > input').type('tetetet');
      cy.get('[data-param-name="password"] > .parameters-col_description > input').type('tetetet');
      cy.get('.execute-wrapper > .btn').click();
  
      cy.request('https://mariancure-backend.vercel.app/api/concerns/').then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length.above(0)
      cy.wait(8000);
    })
  }) 
})

  describe('User_Login', () => {
    it('1. Successfully retrieve login information.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_login_get')
      cy.get('.try-out > .btn').click();
      cy.get('[data-param-name="username"] > .parameters-col_description > input').eq(0).type("VAlvarez");
      cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("Patient1234");
      cy.get('.execute-wrapper > .btn').click();
      
      cy.wait(5000);
      })

    it('2. Login failed due to incorrect credentials.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_login_get')
      cy.get('.try-out > .btn').click();
      cy.get('[data-param-name="username"] > .parameters-col_description > input').eq(0).type("VAlvarez");
      cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("Patient123");
      cy.get('.execute-wrapper > .btn').click();    
        
      cy.wait(5000);
    })
  });
})
