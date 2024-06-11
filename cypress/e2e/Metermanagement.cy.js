describe("Meter Management", () => {
    it("Sending Meter Commands", () => {
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
      cy.get(':nth-child(2) > .level-2 > :nth-child(2) > .title-2 > .arrow').click();
      cy.get('.expand-item > .level-3 > :nth-child(1) > .title-3 > .title-text-3').click();
      cy.get('.ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
      cy.contains("Meter barcode").click();
      cy.get('#horizontal_login_value').click().type("NGI-MOCK-QA2122");
      cy.get('.button-general').click();
      cy.xpath("//tbody[@class='ant-table-tbody']/tr[1]//img[@src='/static/media/Test.a77e59c0.svg']").click();
      //cy.get('.ant-select-selection-search-input').click();
      //cy.get('.jss25 > .ant-select > .ant-select-selector').click();
      cy.get('.jss33 > .ant-select > .ant-select-selector').click();
      //cy.get('.ant-select-item-option-content').click({multiple:true});
     //cy.get("Certified").should("be.visible").click();
     cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click({force:true});



        })
})