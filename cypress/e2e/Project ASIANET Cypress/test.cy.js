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
  
      // Installation Order
  
    it('POST Request - Installation Order', () => {
      const accessToken = Cypress.env('accessToken'); 
      cy.wait(3000);

      cy.request(
        {
        method: 'POST',
        url: 'http://10.10.4.2/amt/1.1/eda/productOrderManagement/v4/productOrder',
        body: {
          "externalId": "12345654321",
          "priority": "1",
          "category": "B2B",
          "orderDate": "2024-10-09T02:10:15.673Z",
          "requestedCompletionDate": "2024-10-21T04:30:15.673Z",
          "note": [
              {
                  "text": "BOJONGMENTENG-BOJONG MENTENG RW 04- JALAN KEMUNING VI NO 51"
              },
              {
                  "text": "6281905040424"
              },
              {
                  "text": "99999999"
              }
          ],
          "relatedParty": [
              {
                  "id": "attribut123",
                  "role": "Customer",
                  "name": "Rizki Test Lagi",
                  "contactMedium": [
                      {
                          "mediumType": "telephone",
                          "phoneNumber": "6281905040424"
                      },
                      {
                          "mediumType": "telephone",
                          "phoneNumber": "99999999"
                      }
                  ],
                  "address": {
                      "streetNr": "NO 51",
                      "streetName": "GAMBIR",
                      "streetSuffix": "null",
                      "streetNrLast": "",
                      "streetNrLastSuffix": null,
                      "streetNrSuffix": null,
                      "streetSuffix": "",
                      "streetType": null,
                      "postcode": "10110",
                      "locality": "GAMBIR",
                      "city": "KOTA ADM. JAKARTA PUSAT",
                      "stateOrProvince": "DKI JAKARTA",
                      "district": "GAMBIR",
                      "subDistrict": "GAMBIR",
                      "longitude": "106.9773139",
                      "latitude": "-6.3041115",
                      "country": "Indonesia",
                      "baseType": "geoAddress",
                      "type": "activeAddress",
                      "schemaLocation": null
                  }
              },
              {
                  "id": "ASIANET MEDIA TEKNOLOGI",
                  "role": "Seller",
                  "name": "ASIANET MEDIA TEKNOLOGI"
              }
          ],
          "productOrderItem": [
              {
                  "id": "12345654321",
                  "action": "add",
                  "quantity": "1",
                   "product": {
                      "isBundle": true,
                      "@type": "Product",
                      "productSpecification": {
                          "id": "200",
                          "href": "/productCatalogManagement/v5/productSpecification/200",
                          "name": "Internet",
                          "version": "1",
                          "@type": "ProductSpecificationRef"
                      },
                      "productCharacteristic": [
                          {
                              "name": "QOS",
                              "id": "1",
                              "@type": "Internet",
                              "value": "100 Mbps",
                              "valueType": "string"
                          }
                      ]
                  }
              }
          ],
          "place": [
              {
                  "id": "5164511037",
                  "@baseType": "homepass",
                  "@type": "new"
              }
          ],
          "@type": "installationOrder"
        },
        headers: { 
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => {
        
        console.log(response);
        cy.log('Response Body: ' + JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        // Simpan id ke environment variable
        const id = response.body.id;
        Cypress.env('id', id); 
      });
    });
  
      // Get Order
  
    it('Get Request - Get Order', () => {
      const serviceToken = Cypress.env('serviceToken'); 
      const id = Cypress.env('id');
      cy.wait(3000);

      cy.request({
        method: 'GET',
        url: 'http://10.10.4.3/amt/1.1/odm/getOrderInformation',
        qs: { // Menambahkan Query Parameters
          order_number: id, // Key-value untuk params
        },
        headers: { 
          Authorization: `Bearer ${serviceToken}`
        }
      }).then((response) => {
        
        console.log(response);
        cy.log('Response Body: ' + JSON.stringify(response.body));
        expect(response.status).to.eq(200);
  
        // Simpan workflownumber ke environment variable
        const workflowNumber = response.body.body.workflow_number;
        Cypress.env('workflowNumber', workflowNumber); 
      });
    });  
  
      // // Engineer Status Preparation
  
      it('Post Request - Check Status Preparation', () => {
        const accessToken = Cypress.env('accessToken'); 
        const id = Cypress.env('id');
        const workflowNumber = Cypress.env('workflowNumber');
        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {          
            "activityName":"installationOrder",
            "orderNumber": id,
            "workFlowNumber": workflowNumber,
            "orderStatus": "PREPARATION",
            "teamID": 117,
            "longitude": 106.9773139,
            "latitude": -6.3041115,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ALCLB40056D4",
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
        const id = Cypress.env('id');
        const workflowNumber = Cypress.env('workflowNumber');
        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {          
            "activityName":"installationOrder",
            "orderNumber": id,
            "workFlowNumber": workflowNumber,
            "orderStatus": "IN PROGRESS",
            "teamID": 117,
            "longitude": 106.9773139,
            "latitude": -6.3041115,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ALCLB40056D4",
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
  
      // Engineer Status Arrived
  
      it('Post Request - Check Status ARRIVED', () => {
        const accessToken = Cypress.env('accessToken'); 
        const id = Cypress.env('id');
        const workflowNumber = Cypress.env('workflowNumber');
        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {          
            "activityName":"installationOrder",
            "orderNumber": id,
            "workFlowNumber": workflowNumber,
            "orderStatus": "ARRIVED",
            "teamID": 117,
            "longitude": 106.9773139,
            "latitude": -6.3041115,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ALCLB40056D4",
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
  
      // Engineer Status Installation
  
      it('Post Request - Check Status INSTALLATION', () => {
        const accessToken = Cypress.env('accessToken'); 
        const id = Cypress.env('id');
        const workflowNumber = Cypress.env('workflowNumber');
        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {          
            "activityName":"installationOrder",
            "orderNumber": id,
            "workFlowNumber": workflowNumber,
            "orderStatus": "INSTALLATION",
            "teamID": 117,
            "longitude": 106.9773139,
            "latitude": -6.3041115,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ALCLB40056D4",
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
  
      // Engineer Status Activation

    it('Post Request - Check Status ACTIVATION', () => {
    const accessToken = Cypress.env('accessToken'); 
    const id = Cypress.env('id');
    const workflowNumber = Cypress.env('workflowNumber');
    const maxRetries = 10; // jumlah maksimal percobaan
    let retryCount = 0;

    function sendRequest() {
        cy.wait(1000);
        cy.request({
        method: 'POST',
        url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
        body: {          
            "activityName":"installationOrder",
            "orderNumber": id,
            "workFlowNumber": workflowNumber,
            "orderStatus": "ACTIVATION",
            "teamID": 117,
            "longitude": 106.9773139,
            "latitude": -6.3041115,
            "cpe": [
                {
                    "type": "ont",
                    "serialNumber": "ZTEEQLWQ7B06936",
                    "macAddressont": "C8-4C-78-01-25-5A"
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
        },
        failOnStatusCode: false // supaya tidak fail ketika status bukan 200
        }).then((response) => {
        console.log(response);
        cy.log('Response Body: ' + JSON.stringify(response.body));

        if (response.status === 206) {
            expect(response.status).to.eq(206);
        } else if (response.status === 400 && retryCount < maxRetries) {
            retryCount++;
            cy.log(`Retrying... (${retryCount})`);
            sendRequest(); // ulangi request jika statusnya 400
        } else {
            throw new Error('Max retries reached or received unexpected status');
        }
        });
    }

    sendRequest(); // memulai request pertama kali
    });

  
     // Engineer Status Update Order To ready
  
    //    it('Post Request - Check Status Update Order To Ready', () => {
    //     const accessToken = Cypress.env('serviceToken'); 
    //     const id = Cypress.env('id');
    //     const workFlowNumber = Cypress.env('workFlowNumber');
    //     cy.wait(1000);
  
    //     cy.request({
    //       method: 'POST',
    //       url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
    //       body: {      
  
    //   "orderNumber": id,
    //   "externalId": "9171002421713036415"
  
    //       },
    //       headers: { 
    //         Authorization: `Bearer ${accessToken}`
    //       }
    //     }).then((response) => {
          
    //       console.log(response);
    //       cy.log('Response Body: ' + JSON.stringify(response.body));
    //       expect(response.status).to.eq(206);
    //     });
    //   }); 

      // Engineer Status TESTING
  
      it('Post Request - Check Status TESTING', () => {
        const accessToken = Cypress.env('accessToken'); 
        const id = Cypress.env('id');
        const workflowNumber = Cypress.env('workflowNumber');
        cy.wait(1000);

        cy.request({
          method: 'POST',
          url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
          body: {          
            "activityName":"installationOrder",
            "orderNumber": id,
            "workFlowNumber": workflowNumber,
            "orderStatus": "TESTING",
            "teamID": 117,
            "longitude": 106.9773139,
            "latitude": -6.3041115,
            "cpe": [
                {
                    "macaddressont": "12345",
                    "serialNumber": "ALCLB40056D4",
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
    
    // Engineer Status POST ACTIVATION
  
     it('Post Request - Check Status POST ACTIVATION', () => {
            const accessToken = Cypress.env('accessToken'); 
            const id = Cypress.env('id');
            const workflowNumber = Cypress.env('workflowNumber');
            cy.wait(1000);
    
            cy.request({
              method: 'POST',
              url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
              body: {          
                "activityName":"installationOrder",
                "orderNumber": id,
                "workFlowNumber": workflowNumber,
                "orderStatus": "POST ACTIVATION",
                "teamID": 117,
                "longitude": 106.9773139,
                "latitude": -6.3041115,
                "cpe": [
                    {
                        "macaddressont": "12345",
                        "serialNumber": "ALCLB40056D4",
                        "type": "ont"
                    }
                ],
                "bastURL" : "https://devels.qualita-indonesia.net/asianet/wo/export/balap/202409000029" ,
                "evidenceURL" : "https://devels.qualita-indonesia.net/asianet/wo/export/pdf/202409000029",
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
        
      // Engineer Status CHANGE PACKAGE
  
    //   it('Post Request - Change Package', () => {
    //     const accessToken = Cypress.env('accessToken'); 
    //     cy.wait(1000);

    //     cy.request({
    //       method: 'POST',
    //       url: 'http://10.10.4.2/amt/1.1/eda/engineerStatus',
    //       body: {          
    //       "externalId": "12345654321",
    //       "priority": "1",
    //       "category": "B2B",
    //       "orderDate": "2024-10-09T02:10:15.673Z",
    //       "requestedCompletionDate": "2024-10-22T02:30:15.673Z",
    //       "note": [
    //           {
    //               "text": "BOJONGMENTENG-BOJONG MENTENG RW 04- JALAN KEMUNING VI NO 51"
    //           },
    //           {
    //               "text": "6281905040424"
    //           },
    //           {
    //               "text": "99999999"
    //           }
    //       ],
    //       "relatedParty": [
    //           {
    //               "id": "attribut123",
    //               "role": "Customer",
    //               "name": "Rizki Test Lagi",
    //               "contactMedium": [
    //                   {
    //                       "mediumType": "telephone",
    //                       "phoneNumber": "6281905040424"
    //                   },
    //                   {
    //                       "mediumType": "telephone",
    //                       "phoneNumber": "99999999"
    //                   }
    //               ],
    //               "address": {
    //                   "streetNr": "NO 51",
    //                   "streetName": "GAMBIR",
    //                   "streetSuffix": "null",
    //                   "streetNrLast": "",
    //                   "streetNrLastSuffix": null,
    //                   "streetNrSuffix": null,
    //                   "streetSuffix": "",
    //                   "streetType": null,
    //                   "postcode": "10110",
    //                   "locality": "GAMBIR",
    //                   "city": "KOTA ADM. JAKARTA PUSAT",
    //                   "stateOrProvince": "DKI JAKARTA",
    //                   "district": "GAMBIR",
    //                   "subDistrict": "GAMBIR",
    //                   "longitude": "106.9773139",
    //                   "latitude": "-6.3041115",
    //                   "country": "Indonesia",
    //                   "baseType": "geoAddress",
    //                   "type": "activeAddress",
    //                   "schemaLocation": null
    //               }
    //           },
    //           {
    //               "id": "ASIANET MEDIA TEKNOLOGI",
    //               "role": "Seller",
    //               "name": "ASIANET MEDIA TEKNOLOGI"
    //           }
    //       ],
    //       "productOrderItem": [
    //           {
    //               "id": "12345654321",
    //               "action": "add",
    //               "quantity": "1",
    //                "product": {
    //                   "isBundle": true,
    //                   "@type": "Product",
    //                   "productSpecification": {
    //                       "id": "200",
    //                       "href": "/productCatalogManagement/v5/productSpecification/200",
    //                       "name": "Internet",
    //                       "version": "1",
    //                       "@type": "ProductSpecificationRef"
    //                   },
    //                   "productCharacteristic": [
    //                       {
    //                           "name": "QOS",
    //                           "id": "1",
    //                           "@type": "Internet",
    //                           "value": "30 Mbps",
    //                           "valueType": "string"
    //                       }
    //                   ]
    //               }
    //           }
    //       ],
    //       "place": [
    //           {
    //               "id": "5164511037",
    //               "@baseType": "homepass",
    //               "@type": "new"
    //           }
    //       ],
    //       "@type": "installationOrder"
          
  
    //       },
    //       headers: { 
    //         Authorization: `Bearer ${accessToken}`
    //       }
    //     }).then((response) => {
          
    //       console.log(response);
    //       cy.log('Response Body: ' + JSON.stringify(response.body));
    //       expect(response.status).to.eq(200);
    //     });
    //   }); 
    
  
  
  
  
  
  });
  
