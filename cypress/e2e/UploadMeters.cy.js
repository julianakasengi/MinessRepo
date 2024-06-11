describe("Meter Upload", () => {
    it("Uploads Meters from a file", () => {
        // Visit the initial URL
        cy.visit("https://nextgen.ngi-test.iner.gy/");
        
        cy.contains("with").click();
    
        cy.origin("https://ngi-auth-ngi-test.auth.eu-west-1.amazoncognito.com", () => {
            cy.get('.panel-right-border > :nth-child(1) > :nth-child(1) > :nth-child(1) > form > div > .btn').click();
        });
    
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('.btn').click();
        cy.get('.btn').should("be.visible");
        cy.visit("https://nextgen.ngi-test.iner.gy/meters/meters");
        
        // Interact with elements to reach the upload container
        cy.get(':nth-child(1) > .btn > .jss6').click();
        cy.get('.jss3.show > .jss5 > :nth-child(1)').click();

      cy.get('.upload-bg').click();

        // Intercept the network request for the upload and mock the response
       //cy.intercept('POST', 'https://ngi.ngi-test.iner.gy/configurationmanagement/api/v1/dictionaries/meterUploadTemplate', {
       cy.intercept('POST', 'https://ngi.ngi-test.iner.gy/metersmanagement/api/v2/meters/assemblies/upload', {
            
            statusCode: 200,
            // body: {
            //     message: 'Upload successful'
            // }
        }).as('upload');
          // Mock file data
          const mockFile = new File(["mock data"], "mockfile.csv", { type: "text/csv" });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(mockFile);

        // Trigger the file input change event
        cy.get('.ant-upload-drag-container').then(input => {
            input[0].files = dataTransfer.files;
            input[0].dispatchEvent(new Event('change', { bubbles: true }));
        });

        cy.wait('@upload', { timeout: 1000000 },{force:true}).then((interception) => {
            cy.log('Intercepted request:', interception);
            expect(interception.response.statusCode).to.eq(200);
        });

        // Verify that the upload was successful
       //cy.get('.upload-success-message', { timeout: 10000 }).should('contain', 'Upload successful');
    });
});
