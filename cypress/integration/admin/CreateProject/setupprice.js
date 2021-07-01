import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe("My Admin Setuplabels Test Suite", function () {
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

  it("1. Enter negative value in Helperrate ", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.CreateprojectUploadinst();
    cy.get("[id=helperRate]").type("-1");
    cy.contains("Can't be lower than 0").should("be.visible");
  });

  it("2. Enter negative value in Auditorrate ", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.CreateprojectUploadinst();
    cy.get("[id=auditorRate]").type("-1");
    cy.contains("Can't be lower than 0").should("be.visible");
  });
  it("3. Enter 0 value in Auditorrate and Helperrate ", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.CreateprojectUploadinst();
    cy.get("[id=helperRate]").type("0");
    cy.get("[id=auditorRate]").type("0");
    cy.get("[data-testid=create-project_button_step-next]").click();
    cy.contains(
      "CONGRATULATIONS, YOU'RE ALL DONE! We will review your request and will get back to you shortly!"
    ).should("be.visible");
  });
  it("4. Check that 'back' button is clicable", function () {
    cy.CreateprojectGeneraltab("Image Annotation");
    cy.CreateprojectSetuplabels();
    cy.CreateprojectUploadinst();
    cy.get("[id=helperRate]").type("0");
    cy.get("[id=auditorRate]").type("0");
    cy.get("[data-testid=create-project_button_step-back]").click();
    cy.contains("Helper instructions").should("be.visible");
  });
});
