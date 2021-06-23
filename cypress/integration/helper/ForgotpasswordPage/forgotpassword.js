/// <reference types="Cypress" />
import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Helper Forgotpassword Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/forgot-password`);
  });

  it("Correct email ", function () {
    cy.get("input[name = email]").type(loginOk);
    cy.get("button[type = submit]").click();
    cy.contains("Password Reset Sent!").should("be.visible");
  });

  it("Incorrect email ", function () {
    cy.get("input[name = email]").type(loginWrong);
    cy.get("button[type = submit]").click();
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("password reset failed.");
      done();
      return false;
    });
  });
});
