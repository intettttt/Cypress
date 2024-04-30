describe('Concern Test Routes', () => {

  describe('Concerns', () => {
      it('Successful retrieval of concerns.', () => {
        cy.visit('https://mariancure-backend.vercel.app/docs#/Concerns/get_concerns_api_concerns__get')
        cy.get('.btn').click();
        cy.get('.execute-wrapper > .btn').click();

        cy.request('https://mariancure-backend.vercel.app/api/concerns/').then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length.above(0)
        cy.wait(8000);
        })
      })
    })

  describe('Concern_with_feedback', () => {
    it('Concerns with feedback available.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Concerns/get_concerns_with_feedback_api_concerns_with_feedback__get')
      cy.get('.btn').click();
      cy.get('.execute-wrapper > .btn').click();

      cy.request('https://mariancure-backend.vercel.app/api/concerns_with_feedback/').then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length.above(0)

      cy.wait(8000);
      })
    })
  })

  describe('Concern_ID', () => {
    it('1. Successful  retrieval concern with the given ID exists.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Concerns/get_concern_api_concerns__concern_id__get')
      cy.get('.btn').click();
      cy.get('input').eq(0).type("1");  
      cy.get('.execute-wrapper > .btn').click();

      cy.get('.response-col_description > :nth-child(1) > .highlight-code > .microlight').should('exist');

      cy.request('https://mariancure-backend.vercel.app/api/concerns/1').then((response) => {
      expect(response.status).to.eq(200);
      expect(Object.keys(response.body)).to.have.length.above(0);

      cy.wait(8000);
      })
    })

    it('2. Concern with the given ID does not exist.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Concerns/get_concern_api_concerns__concern_id__get')
      cy.get('.btn').click();
      cy.get('input').eq(0).type("99");  
      cy.get('.execute-wrapper > .btn').click();

      cy.wait(8000);
      })
    })

  describe('Concern_User_ID', () => {
    it('1. Concerns associated with the given user2 ID exist.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Concerns/get_concern_api_concern_get')
      cy.get('.btn').click();
      cy.get('input').eq(0).type("1");  
      cy.get('.execute-wrapper > .btn').click();

      cy.request('https://mariancure-backend.vercel.app/api/concern?user_id=1').then((response)=>{
      expect(response.status).to.eq(200)
      expect(Object.keys(response.body)).to.have.length.above(0);

      cy.wait(8000);
      })
    })

    it('2. Concerns associated with the given user ID do not exist.', () => {
      cy.visit('https://mariancure-backend.vercel.app/docs#/Concerns/get_concern_api_concern_get')
      cy.get('.btn').click();
      cy.get('input').eq(0).type("4");  
      cy.get('.execute-wrapper > .btn').click();

      cy.wait(8000);
      })
    })

  describe('Add_Concern', () => {
    it('Successful addition of a new concern.', () => {
      const concern = `{
        "name": "Intetxs",
        "contact_number": "09108700992",
        "gender": "Female",
        "height": 161,
        "weight": 55,
        "age": 20,
        "is_pregnant": false,
        "does_breastfeed": false,
        "does_drink_alcohol": false,
        "does_smoke": false,
        "number_of_packs_yearly": 0,
        "chief_complaint_content": "none",
        "family_history_content": "none",
        "allergy_history_content": "none",
        "previous_medication": "none",
        "current_medication": "none",
        "user_id": 1
      }`;

      cy.visit('https://mariancure-backend.vercel.app/docs#/Concerns/add_concern_api_add_concern_post')
      cy.get('.try-out > .btn').click();
      cy.get('.body-param__text').each(($el) => {
      cy.wrap($el).clear(); // Clear each text box
      });
      cy.get('.body-param__text').eq(0).type(concern);
      cy.get('.execute-wrapper > .btn').click();
      cy.intercept('POST', '/add_concern').as('apiRequest');
  
        cy.wait(8000);
        })

    it('Successfully encounters an error as the mandatory text fields are left empty.', () => {
      const concern = `{
        "name": "",
        "contact_number": "09108700992",
        "gender": "",
        "height": ,
        "weight": ,
        "age": 20,
        "is_pregnant": ,
        "does_breastfeed": false,
        "does_drink_alcohol": false,
        "does_smoke": false,
        "number_of_packs_yearly": 0,
        "chief_complaint_content": "none",
        "family_history_content": "",
        "allergy_history_content": "none",
        "previous_medication": "none",
        "current_medication": "none",
        "user_id": 
      }`;

      cy.visit('https://mariancure-backend.vercel.app/docs#/Concerns/add_concern_api_add_concern_post')
      cy.get('.try-out > .btn').click();
      cy.get('.body-param__text').each(($el) => {
      cy.wrap($el).clear(); // Clear each text box
      });
      cy.get('.body-param__text').eq(0).type(concern);
      cy.get('.execute-wrapper > .btn').click();
      cy.intercept('POST', '/add_concern').as('apiRequest');
  
        cy.wait(8000);
        })
      })   
  })
      
    
