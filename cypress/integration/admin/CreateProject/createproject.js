import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Admin CreateProject Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
  });

  it("1. Create ContentModeration Project", function () {
    cy.get('[data-testid="add-project-button"]').click();
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
    cy.fixture("2pic.zip")
      .as("FileUpload")
      .then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: "2pic.zip",
          mimeType: "application/zip",
        });
      });
    cy.wait(4000);
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.get('input[name="labels"]').type("test{enter}");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.fixture("instructions.pdf").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "instructions.pdf",
        mimeType: "application/pdf",
      });
    });
    cy.wait(2000);
    cy.get('textarea[name="adminShortInstruction"]').type(
      "Need to be done asap!"
    );
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.get("[id=helperRate]").type("1");
    cy.get("[id=auditorRate]").type("1");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.contains(
      "CONGRATULATIONS, YOU'RE ALL DONE! We will review your request and will get back to you shortly!"
    ).should("be.visible");
    cy.get(
      "[data-testid=create-project_button_step-next_save-without-helpers]"
    ).click();
  });

  it("2. Create ImageAnnotation Project", function () {
    cy.get('[data-testid="add-project-button"]').click();
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
        mimeType: "application/zip",
      });
    });
    cy.wait(5000);
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.get('input[name="customLabels"]').check().should("be.checked");
    cy.get('input[name="labels"]').type("test{enter}");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.fixture("instructions.pdf").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "instructions.pdf",
        mimeType: "application/pdf",
      });
    });
    cy.wait(2000);
    cy.get('textarea[name="adminShortInstruction"]').type(
      "Need to be done asap!"
    );
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.get("[id=helperRate]").type("1");
    cy.get("[id=auditorRate]").type("1");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.contains(
      "CONGRATULATIONS, YOU'RE ALL DONE! We will review your request and will get back to you shortly!"
    ).should("be.visible");
    cy.get(
      "[data-testid=create-project_button_step-next_save-without-helpers]"
    ).click();
  });

  it("3. Create Digitization Project", function () {
    cy.get('[data-testid="add-project-button"]').click();
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
    cy.wait(4000);
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.get('input[name="customLabels"]').check().should("be.checked");
    cy.get('input[name="labels"]').type("test{enter}");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.fixture("instructions.pdf").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "instructions.pdf",
      });
    });
    cy.get('textarea[name="adminShortInstruction"]').type(
      "Need to be done asap!"
    );
    cy.wait(2000);
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.get("[id=helperRate]").type("1");
    cy.get("[id=auditorRate]").type("1");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.contains(
      "CONGRATULATIONS, YOU'RE ALL DONE! We will review your request and will get back to you shortly!"
    ).should("be.visible");
    cy.get(
      "[data-testid=create-project_button_step-next_save-without-helpers]"
    ).click();
  });
});
