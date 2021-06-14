import config from './config'

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe('My Client Login Test Suite', function () {
    beforeEach(() => {
        cy.visit(`${url}/signin`);
    })

    it('1.1 Log in as client with valid data', function () {
        cy.login(loginOk, passwordOk, url)
    })

    it('1.2 Check that "remember me" box is clicable', function () {
        cy.get('#signinForm_remember').check().should('be.checked')

    })

    it('1.3 Check that "remember me" box is unclicable', function () {
        cy.get("#signinForm_remember").check();
        cy.get("#signinForm_remember").uncheck().should("not.be.checked");
      });

    it('1.4 Check "Forgot password"',function()
    {
        cy.get('.login-form-forgot').click()
        cy.url().should('eq',`${url}/forgot-password`)
    })

    it('2.1 Log in as client with Incorrect Password',function(){  
        cy.login(loginOk, passwordWrong, url, false);
        cy.on("uncaught:exception", (err, runnable) => {
          expect(err.message).to.include("email or password is invalid!");
          done();
          return false;
        });
    })
    it('2.2 Log in as client with Incorrect email',function() // тут тоже самое
    {
        cy.login(loginWrong, passwordOk, url, false);
        cy.on("uncaught:exception", (err, runnable) => {
          expect(err.message).to.include("email or password is invalid!");
          done();
          return false;
        });
            })

    it('2.3 Log in as client with Incorrect email and password',function()// тут тоже самое
    {
        cy.login(loginWrong, passwordWrong, url, false);
        cy.on("uncaught:exception", (err, runnable) => {
          expect(err.message).to.include("email or password is invalid!");
          done();
          return false;
        });
        })

    it('2.4 Leave both fields blank. Attempt to login.',function()
    {
        cy.get("button[type = submit]").click();
        cy.contains("Please enter email").should("be.visible");
        cy.contains("Please enter password").should("be.visible");
    })

    it('2.5 Leave the login field empty. Attempt to login.',function()
    {
        cy.get("input[name = password]").type(passwordOk);
        cy.get("button[type = submit]").click();
        cy.contains("Please enter email").should("be.visible");
})

    it('2.6 Leave the password blank. Attempt to login.',function()
    {
        cy.get("input[name = email]").type(loginOk);
        cy.get("button[type = submit]").click();
        cy.contains("Please enter password").should("be.visible");
})

it('3.1 Validation: enter only symbols to email field',function()
{
    cy.get("input[name = email]").type("!@#>?<%^&*((");
    cy.contains("Email must be a valid email").should("be.visible");
  });

  it("3.2 Validation: enter email without dots in the domain part", function () {
    cy.get("input[name = email]").type("admin@testcom");
    cy.contains("Email must be a valid email").should("be.visible");
  });

  it("3.3 Validation: enter email without @ in email", function () {
    cy.get("input[name = email]").type("admintest.com");
    cy.contains("Email must be a valid email").should("be.visible");
  });

  it("3.4 Validation: enter correct email followed by a few spaces", function () {
    cy.get("input[name = email]").type("admin@test.com  ");
    cy.contains("Email must be a valid email").should("be.visible");
  });

  it("3.5 Validation: enter correct email  starting with multiple spaces", function () {
    cy.get("input[name = email]").type("  admin@test.com");
    cy.contains("Email must be a valid email").should("be.visible");

  });

  it("3.6 Validation: enter less than 8 symbols in password field", function () {
    cy.get("input[name = password]").type("Aa1");
    cy.contains("Password must be at least 8 characters long").should("be.visible");
  });
  
  it("3.7 Validation: email with numbers in the domain part", function () {
    cy.get("input[name = email]").type("111@test.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

  it("3.8 Validation: email with numbers in the domain part", function () {
    cy.get("input[name = email]").type("111@test.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

  it("3.9 Validation: email with a hyphen in the account name", function () {
    cy.get("input[name = email]").type("1-11@test.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

 it("3.10 Validation: email with underscore in the account name", function () {
    cy.get("input[name = email]").type("1_11@test.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  }); 

  it("3.11 Validation: email with underscore in the domain name", function () {
    cy.get("input[name = email]").type("111@te_st.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });

  it("3.12 Validation: email with a hyphen in the domain name", function () {
    cy.get("input[name = email]").type("111@te-st.com");
    cy.get(`[aria-label="check-circle"]`).should("be.visible");
  });


  

})