import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Admin CreateProject Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
  });

  it("1. Create ContentModeration Project", function () {
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
    cy.fixture("2pic.zip").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "2pic.zip",
      });
    });
    cy.get("[data-testid=create-project_button_step-next]").click();
  });

  it("2. Create ImageAnnotation Project", function () {
    cy.get('[class="sc-giIncl efCwnz"]').click();
    cy.get('[class="ant-select-selection-search-input"]').click();
    cy.get('[class="ant-select-item-option-content"]')
      .contains("My best company", { matchCase: false })
      .click();
    cy.get("input[type=text]").typeRandomName();
    cy.get('[class="ant-typography"]')
      .contains("Image Annotation", {
        matchCase: false,
      })
      .click();
    cy.fixture("2pic.zip").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "2pic.zip",
      });
    });
    cy.get("[data-testid=create-project_button_step-next]").click();
  });

  it("3. Create Digitization Project", function () {
    cy.get('[class="sc-giIncl efCwnz"]').click();
    cy.get('[class="ant-select-selection-search-input"]').click();
    cy.get('[class="ant-select-item-option-content"]')
      .contains("My best company", { matchCase: false })
      .click();
    cy.get("input[type=text]").typeRandomName();
    cy.get('[class="ant-typography"]')
      .contains("Digitization", {
        matchCase: false,
      })
      .click();
    cy.fixture("2pic.zip").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "2pic.zip",
      });
    });
    cy.get("[data-testid=create-project_button_step-next]").click();
  });
});
