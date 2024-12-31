
describe('API Test with CSV Data for Dynamic Parameters', () => {

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


      // Stress Test

      it('Stress Test', () => {
        const accessToken = Cypress.env('accessToken'); 
        cy.readCsv('cypress/fixtures/stress.csv').then((data) => {
            data.forEach((row) => {
                const requestBody = 
                {
                    "externalId": row.externalid,
                    "priority": "1",
                    "category": "B2B",
                    "orderDate": "2024-09-30T04:10:15.673Z",
                    "requestedCompletionDate": row.date,
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
                            "id": "100",
                            "role": "Customer",
                            "name": row.name,
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
                                "streetName": "JALAN|GATOT SUBROTO|||||51|2|7",
                                "streetSuffix": "",
                                "streetNrLast": "",
                                "streetNrLastSuffix": "",
                                "streetNrSuffix": "",
                                "streetType": "",
                                "postcode": "10270",
                                "locality": "TANAH ABANG|GELORA",
                                "city": "KOTA ADM. JAKARTA PUSAT",
                                "stateOrProvince": "DKI JAKARTA",
                                "district": "TANAH ABANG|GELORA",
                                "subDistrict": "TANAH ABANG|GELORA",
                                "longitude": "106.807155",
                                "latitude": "-6.214208",
                                "country": "Indonesia",
                                "baseType": "geoAddress",
                                "type": "activeAddress",
                                "schemaLocation": ""
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
                            "id": row.externalid,
                            "action": "add",
                            "quantity": "1",
                            "product": {
                                "isBundle": true,
                                "@type": "Product",
                                "productSpecification": {
                                    "id": "205",
                                    "href": "/productCatalogManagement/v5/productSpecification/153",
                                    "name": "30 Mbps",
                                    "version": "1",
                                    "@type": "ProductSpecificationRef"
                                },
                                "productCharacteristic": [
                                    {
                                        "name": "QOS",
                                        "id": "1",
                                        "@type": "device",
                                        "value": "Internet",
                                        "valueType": "string"
                                    }
                                ]
                            }
                        }
                    ],
                    "place": [
                        {
                            "id": row.homepass,
                            "@baseType": "homepass",
                            "@type": "old"
                        }
                    ],
                    "@type": "serviceUpdateOrder"
                };
    
                // Log request body ke Cypress dan console browser
                cy.log('Request Body:', JSON.stringify(requestBody));  // Akan muncul di log Cypress
                console.log('Request Body:', requestBody);             // Akan muncul di console browser
    
                // Kirim request
                cy.request({
                    method: 'POST',
                    url: 'http://10.10.4.2/amt/1.1/eda/productOrderManagement/v4/productOrder',
                    body: requestBody,
                    headers: { 
                        Authorization: `Bearer ${accessToken}`
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200); // Verifikasi bahwa request berhasil
                });
            });
        });
    });
    
});
