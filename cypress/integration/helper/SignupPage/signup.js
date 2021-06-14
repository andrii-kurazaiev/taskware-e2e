import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Helper Test Suite Signup", function () 
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

  it("1. Sign up new helper", function () {
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
        (email) => /.*\.taskware\.io\/activate\/(.{11}).*/.exec(email.body)[1]
      )
      .then((code) => {
        cy.visit(`${url}/activate/${code}`);
      });
    cy.contains("Sign in").should("be.visible");
  });

  
});
