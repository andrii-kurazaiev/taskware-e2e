/// <reference types="Cypress" />
import config from '../config'

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe('My Helper Forgotpassword Validation Suite',function()
{

    beforeEach(()=> {
        cy.visit(`${url}/forgot-password`);         
    })

    it('1. Enter Correct email and erase ',function()
    {   
        cy.get('input[name = email]').type(loginOk)
        cy.get('input[name = email]').clear().should('have.css',"border-color","rgb(255, 77, 79)")
        cy.contains("Please enter email").should("be.visible");
    
    })

    it("2. Validation: enter only symbols to email field", function () {
        cy.get("input[name = email]").type("!@#>?<%^&*((").should('have.css',"border-color","rgb(255, 77, 79)");
        cy.contains("Email must be a valid email").should("be.visible");
      });
    
      it("3. Validation: enter email without dots in the domain part", function () {
        cy.get("input[name = email]").type("admin@testcom");
        cy.contains("Email must be a valid email").should("be.visible");
      });
    
      it("4. Validation: enter email without @ in email", function () {
        cy.get("input[name = email]").type("admintest.com");
        cy.contains("Email must be a valid email").should("be.visible");
      });
    
      it("5. Validation: enter correct email followed by a few spaces", function () {
        cy.get("input[name = email]").type("admin@test.com  ");
        cy.contains("Email must be a valid email").should("be.visible");
      });
    
      it("6. Validation: enter correct email  starting with multiple spaces", function () {
        cy.get("input[name = email]").type("  admin@test.com");
        cy.contains("Email must be a valid email").should("be.visible");
    
      });
      it("7. Validation: email with numbers in the domain part", function () {
        cy.get("input[name = email]").type("111@test.com");
        cy.get(`[aria-label="check-circle"]`).should("be.visible");
      });
    
      it("8. Validation: email with numbers in the domain part", function () {
        cy.get("input[name = email]").type("111@test.com");
        cy.get(`[aria-label="check-circle"]`).should("be.visible");
      });
    
      it("9. Validation: email with a hyphen in the account name", function () {
        cy.get("input[name = email]").type("1-11@test.com");
        cy.get(`[aria-label="check-circle"]`).should("be.visible");
      });
    
     it("10. Validation: email with underscore in the account name", function () {
        cy.get("input[name = email]").type("1_11@test.com");
        cy.get(`[aria-label="check-circle"]`).should("be.visible");
      }); 
    
      it("11. Validation: email with underscore in the domain name", function () {
        cy.get("input[name = email]").type("111@te_st.com");
        cy.get(`[aria-label="check-circle"]`).should("be.visible");
      });
    
      it("12. Validation: email with a hyphen in the domain name", function () {
        cy.get("input[name = email]").type("111@te-st.com");
        cy.get(`[aria-label="check-circle"]`).should("be.visible");
      });
})