import config from "./config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Client Test Suite Signup", function () 
{
  beforeEach(() => {
    cy.mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("emailAddress");
      });
    cy.visit(`${url}/signin`);
  });

  it("1. Sign up new client", function () {
    cy.visit(`${url}/signup`);

    cy.get("input[name = first_name]").typeRandomName();
    cy.get("input[name = last_name]").typeRandomName();
    cy.get("input[name = email]").type(this.emailAddress);
    cy.get("input[name = password]").typeRandomPassword();
    cy.get("button[type = submit]").click();
    cy.contains("Thank you for registering!").should("be.visible");
    cy.mailslurp()
      .then((mailslurp) =>
        mailslurp.waitForLatestEmail(this.inboxId, 30000, true)
      )
      .then(
        (email) =>
          /.*\.taskware\.io\/activate\/([A-Za-z0-9]{10}).*/.exec(email.body)[1]
      )
      .then((code) => {
        cy.visit(`${url}/activate/${code}`);
      });

  });

  it("2. Check alert messages for Non filing fields", function () {
    cy.visit(`${url}/signup`);
    cy.get("button[type = submit]").click();
    cy.contains("Please enter first name").should("be.visible");
    cy.contains("Please enter last name").should("be.visible");
    cy.contains("Please enter email").should("be.visible");
    cy.contains("Please enter password").should("be.visible");

  });

  it("3. Signup with unvalid data", function () {
    cy.visit(`${url}/signup`);

    cy.get("input[name = first_name]").type("!@");
    cy.get("input[name = last_name]").type("!@");
    cy.get("input[name = email]").type("!@");
    cy.get("input[name = password]").type("!@");
    cy.get("button[type = submit]").click();
    cy.contains("First name must be at least 3 characters").should("be.visible");
    cy.contains("Last name must be at least 3 characters").should("be.visible");
    cy.contains("Email must be at least 3 characters").should("be.visible");
    cy.contains("Must contain at least 1 lowercase letter").should("be.visible");

  });

  it("4. Signup as existing user", function () {
    cy.visit(`${url}/signup`);

    cy.get("input[name = first_name]").typeRandomName();
    cy.get("input[name = last_name]").typeRandomName();
    cy.get("input[name = email]").type(loginOk);
    cy.get("input[name = password]").type(passwordOk);
    cy.get("button[type = submit]").click();
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("A unique constraint would be violated on Helper. Details: Field name = email");
      done();
      return false;
    });

  });

});
