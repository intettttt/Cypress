describe('User Test Routes', () => {
    describe('Add_User', () => {
        it('1. Successfully add a new user account.', () => {
            const string = `{
            "username": "Test1",
            "full_name": "Test1",
            "email_address": "test1@gmail.com",
            "role_name": "Patient",
            "password": "test1"
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
          "username": "Intet",
          "full_name": "Intet",
          "email_address": "Intet@gmail.com",
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

  describe('Get_Email_Address', () => {
      it('Successfully retrieve user information by email address', () => {
        cy.visit('https://mariancure-backend.vercel.app/docs#/Users/update_user_password_api_update_password_put')
        cy.get('.btn').click();
        cy.get('[data-param-name="email_address"] > .parameters-col_description > input').eq(0).type("test1@gmail.com");
        cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("test1")
        cy.get('.execute-wrapper > .btn').click();

        cy.request('https://mariancure-backend.vercel.app/api/users/').then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length.above(0)

        cy.wait(8000);

     })
   })
 })

 describe('Update_Password', () => {
      it('1. Succesfully retrieve user information', () => {
        cy.visit('https://mariancure-backend.vercel.app/docs#/Users/update_user_password_api_update_password_put')
        cy.get('.btn').click();
        cy.get('[data-param-name="email_address"] > .parameters-col_description > input').eq(0).type("test1@gmail.com");
        cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("test1")
        cy.get('.execute-wrapper > .btn').click();

        cy.wait(8000);

   })

      it('2. Failed due to incorrect credentials.', () => {
        cy.visit('https://mariancure-backend.vercel.app/docs#/Users/update_user_password_api_update_password_put')
        cy.get('.btn').click();
        cy.get('[data-param-name="email_address"] > .parameters-col_description > input').eq(0).type("test1111@gmail.com");
        cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("test1")
        cy.get('.execute-wrapper > .btn').click();

        cy.wait(8000);

    })
  })

  describe('User_Login', () => {
    it('1. Successfully retrieve login information.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_login_get')
      cy.get('.try-out > .btn').click();
      cy.get('[data-param-name="username"] > .parameters-col_description > input').eq(0).type("Test1");
      cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("test1");
      cy.get('.execute-wrapper > .btn').click();
      
      cy.wait(5000);
      })

    it('2. Login failed due to incorrect credentials.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_login_get')
      cy.get('.try-out > .btn').click();
      cy.get('[data-param-name="username"] > .parameters-col_description > input').eq(0).type("test1");
      cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("Test1");
      cy.get('.execute-wrapper > .btn').click();    
        
      cy.wait(5000);
    })
  });  

  describe('User_Login', () => {
    it('1. Successfully retrieve login information.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_login_get')
      cy.get('.try-out > .btn').click();
      cy.get('[data-param-name="username"] > .parameters-col_description > input').eq(0).type("Test1");
      cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("test1");
      cy.get('.execute-wrapper > .btn').click();
      
      cy.wait(5000);
      })

    it('2. Login failed due to incorrect credentials.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Users/get_user_api_login_get')
      cy.get('.try-out > .btn').click();
      cy.get('[data-param-name="username"] > .parameters-col_description > input').eq(0).type("Test1");
      cy.get('[data-param-name="password"] > .parameters-col_description > input').eq(0).type("test123");
      cy.get('.execute-wrapper > .btn').click();    
        
      cy.wait(5000);
    })
  })

})


