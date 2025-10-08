describe('API Testing dengan Cypress', () => {
  
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
    cy.wait(1000);
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

    // Unregister ONT

  it('POST Request - Unregister ONT', () => {
    const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="uri://alcatel.com/apc/9.7">
      <soapenv:Header/>
      <soapenv:Body>
        <ns:clean>
          <objectName>JKP-KPITB-OLT1-FX16:1-1-2-7-3</objectName>
          <operationInitiator>11</operationInitiator>
        </ns:clean>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
    cy.request({
      method: 'POST',
      url: 'http://10.10.2.22/soap/services/ApcRemotePort/9.7',
      body: soapRequest,
      auth: {
        username: 'asianet',
        password: 'AMT-Asianet2022'
      }      
    }).then((response) => {
      
      console.log(response);
      cy.log('Response Body: ' + JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
  });

     // Check Unregister ONT
     
  it('Post Request - Check Unregister ONT', () => {
        const serviceToken = Cypress.env('serviceToken'); 
        cy.request({
          method: 'POST',
          url: 'http://10.10.4.3/amt/1.1/nkacli/ontqueryserial',
          body: {
            "SerialNumber": "ALCLB40056D4"
        },
          headers: { 
            Authorization: `Bearer ${serviceToken}`
          }
        }).then((response) => {
          
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
          expect(response.status).to.eq(200);
        });
      });  

     // Check already Register ONT
     
     it('Post Request - Check already register ONT', () => {
      const serviceToken = Cypress.env('serviceToken'); 
      cy.request({
        method: 'POST',
        url: 'http://10.10.4.3/amt/1.1/nkacli/ontcheckserial',
        body: {
          "SerialNumber": "ALCLB40056D4"
      },
        headers: { 
          Authorization: `Bearer ${serviceToken}`
        }
      }).then((response) => {
        
        console.log(response);
        cy.log('Response Body: ' + JSON.stringify(response.body));
        expect(response.status).to.eq(200);
      });
    });  

});
