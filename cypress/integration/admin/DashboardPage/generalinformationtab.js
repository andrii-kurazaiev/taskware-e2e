import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Admin GeneralTab Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
  });
  afterEach(() => {
    cy.get(".ant-drawer-close > .anticon > svg").click();
    // cy.get('[class="ant-dropdown-trigger sc-gInsOo grsaJH"]').click();
    // cy.contains("Log out").click();
  });

  it("1 Check alerts ", function () {
    cy.get('[class="sc-giIncl efCwnz"]').click();
    cy.get('[class="ant-select-selection-search-input"]').click();
    cy.get("[data-testid=create-project_button_step-next] > span").click();
    cy.contains(
      "Can't proceed without a file",
      "You can't proceed without clients",
      "Required"
    ).should("be.visible");
  });

  it("2 Enter only number to Ptoject name field ", function () {
    cy.get('[class="sc-giIncl efCwnz"]').click();
    cy.get('[class="ant-select-selection-search-input"]').click();
    cy.get("input[type=text]").type("123");
    cy.get("[data-testid=create-project_button_step-next] > span").click();
    cy.contains("Must not contain only numbers and space").should("be.visible");
  });
});
