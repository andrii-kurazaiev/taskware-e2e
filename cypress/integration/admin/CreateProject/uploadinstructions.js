import config from "../config";

const {
  loginOk,
  loginWrong,
  passwordOk,
  passwordWrong,
  url,
  ShortInstruction,
} = config;

describe("My Admin UploadInstructions Test Suite", function () {
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

  it("1. Enter less than min chars in ShortInstruction field ", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.get(ShortInstruction).type("q!");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.contains("Should contain at least 20 char-s").should("be.visible");
  });

  it("2.Enter exact  min chars in ShortInstruction field ", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.get(ShortInstruction).type("12345678911234567892");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.contains("Add price").should("be.visible");
  });

  it("3.Enter more than  min chars in ShortInstruction field ", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.get(ShortInstruction).type("123456789112345678923");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.contains("Add price").should("be.visible");
  });

  it("4. Upload invalid file format ", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.fixture("2pic.zip")
      .as("FileUpload")
      .then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: "2pic.zip",
          mimeType: "application/zip",
        });
      });
    // cy.wait(5000);
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include(
        "mimetype application/pdf is not supported"
      );
      done();
      return false;
    });
  });
  it("5. Check that 'back' button is clicable", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.get("[data-testid=create-project_button_step-back]").click();
    cy.contains("MANUAL ENTRY").should("be.visible");
  });
});
