
describe('API Test with CSV Data for Dynamic Parameters', () => {

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


          // Activation Request Using CSV


          it('API Activation Request By CSV', () => {
            const accessToken = Cypress.env('accessToken'); 
            cy.readCsv('cypress/fixtures/orders.csv').then((data) => {
                data.forEach((row) => {
                    const requestBody = {
                        activityName: "installationOrder",
                        orderNumber: row.order_number,               
                        workFlowNumber: row.workflow_number,   
                        orderStatus: "ACTIVATION",
                        teamID: Number(row.team_id),
                        longitude: 106.831623,
                        latitude: -6.184154,
                        cpe: [
                            {
                                serialNumber: row.serial_number,
                                type: "ont"
                            }
                        ],
                        bastURL: "http://google.com",
                        fatLongitude: 106.831623,
                        fatLatitude: -6.184154,
                        additionalUTP: 0,
                        additionalDropCable: 0,
                        fatport: "10.10.10"
                    };
        
                    // Log request body ke Cypress dan console browser
                    cy.log('Request Body:', JSON.stringify(requestBody));  // Akan muncul di log Cypress
                    console.log('Request Body:', requestBody);             // Akan muncul di console browser
        
                    // Kirim request
                    cy.request({
                        method: 'POST',
                        url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
                        body: requestBody,
                        headers: { 
                            Authorization: `Bearer ${accessToken}`
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(206); // Verifikasi bahwa request berhasil
                    });
                });
            });
        });
        
  });
  
