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
     
    // Get Work Schedule
    it('Post Request - gET Work Schedule', () => {
        const serviceToken = Cypress.env('serviceToken'); 
        cy.wait(1000);

        cy.request(
        {
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/apm/setworkordersched',
          body: {
            "orderNumber": "OH1098278471964225434",
            "parentCustomer": 1,
            "scheduleID": "2024102330122",
            "activityName": "INSTALLATION",
            "userName": "EKO APRIYANTO",
            "userContact": "628121150155",
            "QOS": 50, 
            "longitude": 112.642236,
            "latitude": -8.034953,
            "city": "KOTA MALANG",
            "street": "ARJOWINANGUN-ARJOWINANGUN RW 5- JALAN CEMPAKAPUTIH NO RK#1 ARJOWINANGUN KEDUNGKANDANG KOTA MALANG JAWA TIMUR 99999",
            "text":"628121150155",
            "slotID": 3,
            "teamID": 122,
            "onttype": "ZTE G1245",
            "totalstb": 2,
            "deviceDetailType": "Android",
            "note":"ARJOWINANGUN-ARJOWINANGUN RW 5- JALAN CEMPAKAPUTIH NO RK#1 ARJOWINANGUN KEDUNGKANDANG KOTA MALANG JAWA TIMUR 99999"
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
