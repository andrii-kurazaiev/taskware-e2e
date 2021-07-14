import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url, userpage } =
  config;

describe("My Admin Createclient Test Suite", function () {
  beforeEach(() => {
    cy.createEmail();
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
    cy.get("#rc-tabs-1-tab-Clients").click();
  });

  afterEach(() => {
    cy.deleteEmail();
  });

  it("1. Create new client", function () {
    cy.get(":nth-child(2) > .sc-giAqHp").click();
    cy.get("#antd-modal-form_email").type(this.emailAddress);
    cy.get("#antd-modal-form_first_name").typeRandomName();
    cy.get("#antd-modal-form_last_name").typeRandomName();
    cy.get("#antd-modal-form_companyName").typeRandomName();
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
        cy.visit(`https://client.dev.taskware.io/activate/${code}`);
      });
  });
});
