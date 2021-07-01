import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Client GeneralTab Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
    cy.get('[data-testid="add-project-button"]').click();
  });
  afterEach(() => {
    cy.get(".ant-drawer-close > .anticon > svg").click();
    cy.get('[data-testid="avatar-dropdown-menu"]').click();
    cy.contains("Log out").click();
  });

  it("1. Check alerts ", function () {
    cy.get("[data-testid='create-project_button_step-next']").click();
    cy.contains("Can't proceed without a file").should("be.visible");
    cy.contains("Required").should("be.visible");
  });

  it("2. Enter only number to Ptoject name field ", function () {
    cy.get("#title").click();
    cy.get("input[type=text]").type("123");
    cy.get("[data-testid='create-project_button_step-next']").click();
    cy.contains("Must not contain only numbers and space").should("be.visible");
  });

  it("3. Enter only symbols to Ptoject name field ", function () {
    cy.get("#title").click();
    cy.get("input[type=text]").type("@!#&");
    cy.get("[data-testid='create-project_button_step-next']").click();
    cy.contains("Must contain only latin letters, numbers & space").should(
      "be.visible"
    );
  });

  it("4. Enter only spaces to Ptoject name field ", function () {
    cy.get("#title").click();
    cy.get("input[type=text]").type("  ");
    cy.get("[data-testid='create-project_button_step-next']").click();
    cy.contains("Must not contain only numbers and space").should("be.visible");
  });
});
