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