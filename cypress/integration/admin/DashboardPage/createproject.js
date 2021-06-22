import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Client Login Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
  });

  it("1 Create ContentModeration Project", function () {
    cy.get('[class="sc-giIncl efCwnz"]').click();
    cy.get('[class="ant-select-selection-search-input"]').click();
    cy.get('[class="ant-select-item-option-content"]')
      .contains("My best company", { matchCase: false })
      .click();
    cy.get("input[type=text]").typeRandomName();
    cy.get('[class="ant-typography"]')
      .contains("Content Moderation", {
        matchCase: false,
      })
      .click();
  });
});
