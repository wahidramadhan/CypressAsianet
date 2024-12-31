describe('API Testing dengan Cypress', () => {
  
    // Generate Token
  
    it('POST Request - Generatce Token', () => {
      cy.request({
        method: 'POST',
        url: 'http://10.10.4.2/amt/1.1/atm/generateToken', 
        body: {
          email: 'Pramana@ioh.co.id',
          password: 'ltsm321Q@'
        },
        headers: { 
          'content-type': 'application/json'
        }
      }).then((response) => {
  
        cy.log('Response Body: ' + JSON.stringify(response.body));
        // Simpan token ke environment variable
        const accessToken = response.body.body.accessToken;
        Cypress.env('accessToken', accessToken); 
        
      });
    });

});