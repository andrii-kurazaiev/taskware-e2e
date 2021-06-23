import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Admin Login  Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
  });

  it("1.1 Log in as admin with valid data", function () {
    cy.login(loginOk, passwordOk, url);
  });

  it('1.2 Check that "remember me" box is clicable', function () {
    cy.get("#signinForm_remember").check().should("be.checked");
  });

  it('1.3 Check that "remember me" box is unclicable', function () {
    cy.get("#signinForm_remember").check();
    cy.get("#signinForm_remember").uncheck().should("not.be.checked");
  });

  it('1.4 Check "Forgot password"', function () {
    cy.get(".login-form-forgot").click();
    cy.contains("Forgot your password?").should("be.visible");
  });

  it("2.1 Log in as admin with Incorrect Password", function () {
    cy.login(loginOk, passwordWrong, url, false);
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("email or password is invalid!");
      done();
      return false;
    });
  });
  it("2.2 Log in as admin with Incorrect email", function () {
    cy.login(loginWrong, passwordOk, url, false);
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("email or password is invalid!");
      done();
      return false;
    });
  });

  it("2.3 Log in as admin with Incorrect email and password", function () // тут тоже самое
  {
    cy.login(loginWrong, passwordWrong, url, false);
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("email or password is invalid!");
      done();
      return false;
    });
  });

  it("2.4 Leave both fields blank. Attempt to login.", function () {
    cy.get("button[type = submit]").click();
    cy.contains("Please enter email").should("be.visible");
    cy.contains("Please enter password").should("be.visible");
  });

  it("2.5 Leave the login field empty. Attempt to login.", function () {
    cy.get("input[name = password]").type(passwordOk);
    cy.get("button[type = submit]").click();
    cy.contains("Please enter email").should("be.visible");
  });

  it("2.6 Leave the password blank. Attempt to login.", function () {
    cy.get("input[name = email]").type(loginOk);
    cy.get("button[type = submit]").click();
    cy.contains("Please enter password").should("be.visible");
  });
});
