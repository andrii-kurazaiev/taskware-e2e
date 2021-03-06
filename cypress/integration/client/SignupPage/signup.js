import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Client Test Suite Signup", function () {
  beforeEach(() => {
    cy.createEmail();
    cy.visit(`${url}/signin`);
  });

  afterEach(() => {
    cy.deleteEmail();
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
});
