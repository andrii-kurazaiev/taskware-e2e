import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Client Login Validation Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
  });


  it("1 Validation: enter only symbols to email field", function () {
    cy.get("input[name = email]").type("!@#>?<%^&*((");
    cy.contains("Email must be a valid email").should("be.visible");
  });

  it("2 Validation: enter email without dots in the domain part", function () {
    cy.get("input[name = email]").type("admin@testcom");
    cy.contains("Email must be a valid email").should("be.visible");
  });

  it("3 Validation: enter email without @ in email", function () {
    cy.get("input[name = email]").type("admintest.com");
    cy.contains("Email must be a valid email").should("be.visible");
  });

  it("4 Validation: enter correct email followed by a few spaces", function () {
    cy.get("input[name = email]").type("admin@test.com  ");
    cy.contains("Email must be a valid email").should("be.visible");
  });

  it("5 Validation: enter correct email  starting with multiple spaces", function () {
    cy.get("input[name = email]").type("  admin@test.com");
    cy.contains("Email must be a valid email").should("be.visible");

  });

  it("6 Validation: enter less than 8 symbols in password field", function () {
    cy.get("input[name = password]").type("Aa1");
    cy.contains("Password must be at least 8 characters long").should("be.visible");
  });
  
  it("7 Validation: email with numbers in the domain part", function () {
    cy.get("input[name = email]").type("111@test.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

  it("8 Validation: email with numbers in the domain part", function () {
    cy.get("input[name = email]").type("111@test.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

  it("9 Validation: email with a hyphen in the account name", function () {
    cy.get("input[name = email]").type("1-11@test.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

 it("10 Validation: email with underscore in the account name", function () {
    cy.get("input[name = email]").type("1_11@test.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  }); 

  it("11 Validation: email with underscore in the domain name", function () {
    cy.get("input[name = email]").type("111@te_st.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

  it("3.12 Validation: email with a hyphen in the domain name", function () {
    cy.get("input[name = email]").type("111@te-st.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

});