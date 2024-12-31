describe('API Testing dengan Cypress', () => {
    
    Cypress.env('orderNumber', 'OH1098278471964225434');
    Cypress.env('workflow', '202410000137');
    Cypress.env('longit', 112.642236);
    Cypress.env('latid', -8.034953);
    Cypress.env('teamid', 122);
    Cypress.env('activity', 'installationOrder');
    Cypress.env('serial', 'ZTEGD6DF69E6');
    Cypress.env('mac', 'C84C.7801.255A');   
    
    // Generate Token
  
    it('POST Request - Generate Token', () => {
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
   
  
      // Engineer Status Preparation
  
      it('Post Request - Check Status Preparation', () => {
        const accessToken = Cypress.env('accessToken'); 
        const orderNumber = Cypress.env('orderNumber');
        const workflow = Cypress.env('workflow');
        const activity = Cypress.env('activity');
        cy.wait(1000);

        cy.request(
        {
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {
            "activityName":activity,
            "orderNumber": orderNumber,
            "workFlowNumber": workflow,
            "orderStatus": "PREPARATION",
            "teamID": 122,
            "longitude": 106.9773139,
            "latitude": -6.3041115,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ZTEEQLWQ7B08180",
                    "type": "ont"
                }
            ],
            "bastURL": "http://google.com",
            "fatLongitude": 107.5113277,
            "fatLatitude": -6.9215142,
            "additionalUTP": 0,
            "additionalDropCable": 0,
            "fatport": "10.10.10"
        },
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response) => {
          
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
          expect(response.status).to.eq(200);
        });
      });  
  
      // Engineer Status In Progress
  
      it('Post Request - Check Status IN PROGRESS', () => {
        const accessToken = Cypress.env('accessToken'); 
        const orderNumber = Cypress.env('orderNumber');
        const workflow = Cypress.env('workflow');
        const activity = Cypress.env('activity');
        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {
            "activityName":activity,
            "orderNumber": orderNumber,
            "workFlowNumber": workflow,
            "orderStatus": "IN PROGRESS",
            "teamID": 122,
            "longitude": 106.9773139,
            "latitude": -6.3041115,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ZTEEQLWQ7B08180",
                    "type": "ont"
                }
            ],
            "bastURL": "http://google.com",
            "fatLongitude": 107.5113277,
            "fatLatitude": -6.9215142,
            "additionalUTP": 0,
            "additionalDropCable": 0,
            "fatport": "10.10.10"
        },
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response) => {
          
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
          expect(response.status).to.eq(200);
        });
      });  
  
     //  Engineer Status Arrived
  
      it('Post Request - Check Status ARRIVED', () => {
        const accessToken = Cypress.env('accessToken'); 
        const orderNumber = Cypress.env('orderNumber');
        const longit = Cypress.env('longit'); 
        const latid = Cypress.env('latid');
        const workflow = Cypress.env('workflow');
        const teamID = Cypress.env('teamid');
        const activity = Cypress.env('activity');

        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {
            "activityName":activity,
            "orderNumber": orderNumber,
            "workFlowNumber": workflow,
            "orderStatus": "ARRIVED",
            "teamID": teamID,
            "longitude": longit,
            "latitude": latid,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ZTEEQLWQ7B08180",
                    "type": "ont"
                }
            ],
            "bastURL": "http://google.com",
            "fatLongitude": longit,
            "fatLatitude": latid,
            "additionalUTP": 0,
            "additionalDropCable": 0,
            "fatport": "10.10.10"
        },
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response) => {
          
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
          expect(response.status).to.eq(200);
        });
      }); 
  
      // Engineer Status Installation
  
      it('Post Request - Check Status INSTALLATION', () => {
        const accessToken = Cypress.env('accessToken'); 
        const orderNumber = Cypress.env('orderNumber');
        const longit = Cypress.env('longit'); 
        const latid = Cypress.env('latid');
        const workflow = Cypress.env('workflow');
        const teamID = Cypress.env('teamid');
        const activity = Cypress.env('activity');

        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {
            "activityName":activity,
            "orderNumber": orderNumber,
            "workFlowNumber": workflow,
            "orderStatus": "INSTALLATION",
            "teamID": teamID,
            "longitude": longit,
            "latitude": latid,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ZTEEQLWQ7B08180",
                    "type": "ont"
                }
            ],
            "bastURL": "http://google.com",
            "fatLongitude": longit,
            "fatLatitude": latid,
            "additionalUTP": 0,
            "additionalDropCable": 0,
            "fatport": "10.10.10"
        },
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response) => {
          
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
          expect(response.status).to.eq(200);
        });
      }); 
  
      // Engineer Status Activation

      it('Post Request - Check Status ACTIVATION', () => {
        const accessToken = Cypress.env('accessToken'); 
        const orderNumber = Cypress.env('orderNumber');
        const longit = Cypress.env('longit'); 
        const latid = Cypress.env('latid');
        const workflow = Cypress.env('workflow');
        const teamID = Cypress.env('teamid');
        const activity = Cypress.env('activity');
        const serial = Cypress.env('serial');
        const mac = Cypress.env('mac');
        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {
            "activityName":activity,
            "orderNumber": orderNumber,
            "workFlowNumber": workflow,
            "orderStatus": "ACTIVATION",
            "teamID": teamID,
            "longitude": longit,
            "latitude": latid,
            "cpe": [
              {
                "type": "ont",
                "serialNumber": serial,
                "macAddressont": mac
              },
              {
                "type": "stb",
                "stbType": "stbType1",
                "serialNumber": "21113000007415",
                "macAddressstb": "3485.1126.64A2"
              },
              {
                "type": "stb",
                "stbType": "stbType2",
                "serialNumber": "23061200033529",
                "macAddressstb": "34D8.568B.1691"
              }
            //   {
            //     "type": "stb",
            //     "stbType": "stbType3",
            //     "serialNumber": "21113000007415",
            //     "macAddressstb": "3485112664A2"
            //   }
            ],
            "bastURL": "http://google.com",
            "fatLongitude": longit,
            "fatLatitude": latid,
            "additionalUTP": 0,
            "additionalDropCable": 0,
            "fatport": "10.10.10"
        },
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response) => {
          
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
          expect(response.status).to.eq(206);
        });
      }); 

      // Engineer Status TESTING

      it('Post Request - Check Status TESTING', () => {
        const accessToken = Cypress.env('accessToken'); 
        const orderNumber = Cypress.env('orderNumber');
        const longit = Cypress.env('longit'); 
        const latid = Cypress.env('latid');
        const workflow = Cypress.env('workflow');
        const teamID = Cypress.env('teamid');
        const activity = Cypress.env('activity');
        const serial = Cypress.env('serial');
        const mac = Cypress.env('mac');
        cy.wait(60000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {
            "activityName":activity,
            "orderNumber": orderNumber,
            "workFlowNumber": workflow,
            "orderStatus": "TESTING",
            "teamID": teamID,
            "longitude": longit,
            "latitude": latid,
            "cpe": [
              {
                "type": "ont",
                "serialNumber": serial,
                "macAddressont": mac
              },
              {
                "type": "stb",
                "stbType": "stbType1",
                "serialNumber": "21113000007415",
                "macAddressstb": "3485112664A2"
              },
              {
                "type": "stb",
                "stbType": "stbType2",
                "serialNumber": "21113000007415",
                "macAddressstb": "3485112664A2"
              }
            //   {
            //     "type": "stb",
            //     "stbType": "stbType3",
            //     "serialNumber": "21113000007415",
            //     "macAddressstb": "3485112664A2"
            //   }
            ],
            "bastURL": "http://google.com",
            "fatLongitude": longit,
            "fatLatitude": latid,
            "additionalUTP": 0,
            "additionalDropCable": 0,
            "fatport": "10.10.10"
        },
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response) => {
          
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
          expect(response.status).to.eq(200);
        });
      }); 

      // Engineer Status POST ACTIVATION

      it('Post Request - Check Status POST ACTIVATION', () => {
        const accessToken = Cypress.env('accessToken'); 
        const orderNumber = Cypress.env('orderNumber');
        const longit = Cypress.env('longit'); 
        const latid = Cypress.env('latid');
        const workflow = Cypress.env('workflow');
        const teamID = Cypress.env('teamid');
        const activity = Cypress.env('activity');
        const serial = Cypress.env('serial');
        const mac = Cypress.env('mac');
        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {
            "activityName":activity,
            "orderNumber": orderNumber,
            "workFlowNumber": workflow,
            "orderStatus": "POST ACTIVATION",
            "teamID": teamID,
            "longitude": longit,
            "latitude": latid,
            "cpe": [
              {
                "type": "ont",
                "serialNumber": serial,
                "macAddressont": mac
              },
              {
                "type": "stb",
                "stbType": "stbType1",
                "serialNumber": "21113000007415",
                "macAddressstb": "3485.1126.64A2"
              },
              {
                "type": "stb",
                "stbType": "stbType2",
                "serialNumber": "23061200033529",
                "macAddressstb": "34D8.568B.1691"
              }
            //   {
            //     "type": "stb",
            //     "stbType": "stbType3",
            //     "serialNumber": "21113000007415",
            //     "macAddressstb": "3485112664A2"
            //   }
            ],
            "bastURL" : "https://devels.qualita-indonesia.net/asianet/wo/export/balap/202409000029" ,
            "evidenceURL" : "https://devels.qualita-indonesia.net/asianet/wo/export/pdf/202409000029",
            "fatLongitude": longit,
            "fatLatitude": latid,
            "additionalUTP": 0,
            "additionalDropCable": 0,
            "fatport": "10.10.10"
        },
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response) => {
          
          console.log(response);
          cy.log('Response Body: ' + JSON.stringify(response.body));
          expect(response.status).to.eq(200);
        });
      }); 
    
  });