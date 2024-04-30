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
    it('Successful  retrieval concern with the given ID exists.', () => {
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
  })



})

