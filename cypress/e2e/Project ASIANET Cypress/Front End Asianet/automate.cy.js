describe('Login Website Unifiber', () => {
    beforeEach(() => {

      // Kunjungi URL website login
      cy.visit('http://10.10.4.3/odm-dashboard/login');
      
      });

      // Login
  
    it('When User Loggin Unifiber Website', () => {

      // Masukkan email dan password
      cy.get('#email').type('Pramana@ioh.co.id');
      cy.get('#password').type('ltsm321Q@');
      cy.get('button').contains('Login').click();
      cy.wait(2000);
      });


      // Location
      it('When User Click Menu Location', () => {
        cy.get('#email').type('Pramana@ioh.co.id');
        cy.get('#password').type('ltsm321Q@');
        cy.get('button').contains('Login').click();
        cy.wait(2000);
        cy.get('a[href="/odm-dashboard/location"]').click();
        cy.wait(2000);
      });


      // User Management
      it('When User Click User Management Menu', () => {
        cy.get('#email').type('Pramana@ioh.co.id');
        cy.get('#password').type('ltsm321Q@');
        cy.get('button').contains('Login').click();
        cy.wait(2000);
        cy.get('a[href="/odm-dashboard/order"]').click(); 
        cy.wait(2000);
      });


      // Logout
      it('When User Click Logout', () => {
        cy.get('#email').type('Pramana@ioh.co.id');
        cy.get('#password').type('ltsm321Q@');
        cy.get('button').contains('Login').click();
        cy.wait(2000);
        cy.get('.text-primary.text-xs').click(); 
        cy.wait(2000);
        cy.get('.w-full.cursor-pointer').click();
      }); 



  
  
  });
  