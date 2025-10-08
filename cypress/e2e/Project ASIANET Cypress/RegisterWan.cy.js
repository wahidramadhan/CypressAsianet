describe('Register WAN', () => {

    // Generate Token
  
    it('POST Request - Generate Token', () => {
            cy.request({
              method: 'POST',
              url: 'http://10.10.4.2/amt/1.1/atm/generateToken', 
              body: {
                email: '',
                password: ''
              },
              headers: { 
                'content-type': 'application/json'
              }
            }).then((response) => {
        
              // Print sebagian response di Cypress log UI
              cy.log('Response Status: ' + response.status);
              cy.log('Response Body: ' + JSON.stringify(response.body));
        
              // Memeriksa apakah status response adalah 200
              expect(response.status).to.eq(200);
              
              // Simpan token ke environment variable
              const accessToken = response.body.body.accessToken;
              Cypress.env('accessToken', accessToken); 
              
            });
      });
    
    // Generate Service Token
  
    it('POST Request - Generate Service Token', () => {
        const accessToken = Cypress.env('accessToken'); 
        cy.log('Token yang digunakan: ' + accessToken);
        cy.request({
          method: 'POST',
          url: 'http://10.10.4.3/amt/1.1/atm/generateServiceToken', 
          headers: { 
            Authorization: `Bearer ${accessToken}`, 
            'client-id': Cypress.env('CLIENT_ID'),     
            'client-secret': Cypress.env('CLIENT_SECRET')  
          }
        }).then((response) => {
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
    
          expect(response.status).to.eq(200);
    
               // Simpan token ke environment variable
               const serviceToken = response.body.body.accessToken;
               Cypress.env('serviceToken', serviceToken); 
               
        });
      });

    // Device Info

    it('POST Device Info', () => {

        const serviceToken = Cypress.env('serviceToken'); 
        cy.request({
          method: 'POST',
          url: 'http://10.10.4.3/amt/1.1/acs/deviceInfo', 
          body: {
          "serialNumber": "485754437EC66AA6"
          },
          headers: { 
            Authorization: `Bearer ${serviceToken}`
          }
        }).then((response) => 
        {
    
          cy.log('Response Body: ' + JSON.stringify(response.body));   
          expect(response.status).to.eq(200);
          
        });
      });

    // Register WAN

    it('POST Register WAN', () => {
        
        const serviceToken = Cypress.env('serviceToken'); 
        cy.request({
        method: 'POST',
        url: 'http://10.10.4.3/amt/1.1/acs/registerWAN', 
        headers: { 
            Authorization: `Bearer ${serviceToken}`
        }
        }).then((response) => 
        {
        console.log(response);
        cy.log('Response Body: ' + JSON.stringify(response.body));
        expect(response.status).to.eq(200);
            
        });
    });
 



});
