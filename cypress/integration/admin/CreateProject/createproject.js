import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Admin CreateProject Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
  });

  it("1. Create ContentModeration Project", function () {
    cy.CreateprojectE2E("Content Moderation");
  });

  it("2. Create ImageAnnotation Project", function () {
    cy.CreateprojectE2E("Image Annotation");
  });

  it("3. Create Digitization Project", function () {
    cy.CreateprojectE2E("Digitization");
  });
});
