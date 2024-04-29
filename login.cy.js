describe('Login Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.visit('https://agileeye.netlify.app/');
    });

    it('Successful Login', () => {
        //click the sign in from the dashboard
        cy.get('[float-right m-auto mr-0 text-radical-red-600 text-[20px] textShad2 hover:cursor-pointer]').click();
        cy.url().should('include','/Login');

        cy.get('[p-inputtext p-component p-filled h-10 w-96 mb-4 px-2 inputText rounded-md shadow-md]').type('200');
        cy.get('[p-password p-component p-inputwrapper p-inputwrapper-filled h-10 w-96]').type('123');
        cy.get('[h-10 w-96 mb-2 px-2 buttonMain rounded-md textShad shadow-md hover:bg-gradient-to-t hover:from-yellow-600 hover:to-yellow-600 active:bg-yellow-800 focus:outline-yellow-800 p-button p-component]');
    });

});