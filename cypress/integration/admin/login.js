import config from "./config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Admin Login Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
  });

  it("1.1 Correct email and password", function () {
    cy.login(loginOk, passwordOk, url);
  });

  it('1.2 Check that "remember me" box is clicable', function () {
    cy.get("#signinForm_remember").check().should("be.checked");
  });

  it('1.3 Check "Forgot password"', function () {
    cy.get(".login-form-forgot").click();
    cy.url().should("eq", `${url}/forgot-password`);
  });

  it("2.1 Incorrect Password", function () // никак не могу воспользоватся тут фуецмей логина ибо она предпологвет переход на дешборд а нам не надо
  {
    cy.login(loginOk, passwordWrong, url, false);
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("email or password is invalid!");
      done();
      return false;
    });
  });
  it("2.1 Incorrect email", function () // тут тоже самое
  {
    cy.login(loginWrong, passwordOk, url, false);
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("email or password is invalid!");
      done();
      return false;
    });
  });

  it("2.2 Incorrect email and password", function () // тут тоже самое
  {
    cy.login(loginWrong, passwordWrong, url, false);
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("email or password is invalid!");
      done();
      return false;
    });
  });

  it("2.3 Leave both fields blank. Attempt to login.", function () {
    cy.get("button[type = submit]").click();
    cy.contains("Please enter email").should("be.visible");
    cy.contains("Please enter password").should("be.visible");
  });

  it("2.4 Leave the login field empty. Attempt to login.", function () {
    cy.get("input[name = password]").type(passwordOk);
    cy.get("button[type = submit]").click();
    cy.contains("Please enter email").should("be.visible");
  });

  it("2.5 Leave the password blank. Attempt to login.", function () {
    cy.get("input[name = email]").type(loginOk);
    cy.get("button[type = submit]").click();
    cy.contains("Please enter password").should("be.visible");
  });

  it("3.1.1 enter only symbols to email field", function () {
    cy.get("input[name = email]").type("!@#>?<%^&*((");
    cy.contains("Email must be a valid email").should("be.visible");
  });
});
