describe('Feedback', () => {
  describe('Add_Feedback', () => {
    it('Successfully adding feedback', () => {
      const feedback = `{
        "assessment_content": "chuchuchu",
        "plan_content": "chuchuchu",
        "concern_id": 1,
        "pharmacist_id": 1
      }`;

      cy.visit('https://mariancure-backend.vercel.app/docs#/Feedbacks/add_feedback_api_add_feedback_post')
      cy.get('.try-out > .btn').click();
      cy.get('.body-param__text').each(($el) => {
      cy.wrap($el).clear(); // Clear each text box
      });
      cy.get('.body-param__text').eq(0).type(feedback);
      cy.get('.execute-wrapper > .btn').click();
      cy.intercept('POST', '/add_feedback').as('apiRequest');

      cy.wait(8000);
    })

    it('Error handling for missing feedback text', () => {
    const feedback = `{
        "assessment_content": "",
        "plan_content": "",
        "concern_id": 1,
        "pharmacist_id": 
    }`;
    
        cy.visit('https://mariancure-backend.vercel.app/docs#/Feedbacks/add_feedback_api_add_feedback_post')
        cy.get('.try-out > .btn').click();
        cy.get('.body-param__text').each(($el) => {
        cy.wrap($el).clear(); // Clear each text box
        });
        cy.get('.body-param__text').eq(0).type(feedback);
        cy.get('.execute-wrapper > .btn').click();

        cy.wait(8000);
      })
    })   
  })

