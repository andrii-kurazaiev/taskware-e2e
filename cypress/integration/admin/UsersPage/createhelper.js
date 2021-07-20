import config from "../config";

const { loginOk, passwordOk, url } = config;

describe("My Admin UserPage Test Suite", function () {
  beforeEach(() => {
    cy.createEmail();
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
    cy.get(".sc-clGGWX > :nth-child(2) > :nth-child(2) > svg").click();
  });

  afterEach(() => {
    cy.deleteEmail();
  });

  it("1. Create new helper", function () {
    cy.get('[class="sc-giAqHp bPisBr"]').click();
    cy.get("#antd-modal-form_email").type(this.emailAddress);
    cy.get("#antd-modal-form_first_name").typeRandomName();
    cy.get("#antd-modal-form_last_name").typeRandomName();
    cy.get("button[type = submit]").click();
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
