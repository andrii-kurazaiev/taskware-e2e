import config from "../config";

const {
  loginOk,
  loginWrong,
  passwordOk,
  passwordWrong,
  url,
  ShortInstruction,
} = config;

describe("My Client CreateProject Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
    cy.get('[data-testid="add-project-button"]').click();
  });

  it("1. Create ContentModeration Project", function () {
    cy.CreateprojectGeneraltabClient("Content Moderation");
    cy.CreateprojectSetuplabels();
    cy.CreateprojectUploadinst(ShortInstruction);
    cy.CreateprojectDone();
  });

  it("2. Create ImageAnnotation Project", function () {
    cy.CreateprojectGeneraltabClient("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.CreateprojectUploadinst(ShortInstruction);
    cy.CreateprojectDone();
  });

  it("3. Create Digitization Project", function () {
    cy.CreateprojectGeneraltabClient("Digitization");
    cy.CreateprojectSetuplabels();
    cy.CreateprojectUploadinst(ShortInstruction);
    cy.CreateprojectDone();
  });
});
