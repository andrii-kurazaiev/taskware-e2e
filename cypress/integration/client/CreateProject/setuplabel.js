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

  it("1. Check alerts ", function () {
    cy.CreateprojectGeneraltabClient("Content Moderation");
    cy.get("[data-testid='create-project_button_step-next']").click();
    cy.get("[data-testid='create-project_button_step-next']").click();
    cy.contains("Required").should("be.visible");
  });

  it("2. Enter only symbols to Labels field ", function () {
    cy.CreateprojectGeneraltabClient("Image Annotation");
    cy.get('input[name="labels"]').type("@@@{enter}");
    cy.contains("Must contain only latin letters, numbers & space").should(
      "be.visible"
    );
  });

  it("3. Enter only spaces to Labels field ", function () {
    cy.CreateprojectGeneraltabClient("Image Annotation");
    cy.get('input[name="labels"]').type("   {enter}");
    cy.contains("Can not be empty").should("be.visible");
  });

  it('4. Check that "Allow custom labels" box is clicable ', function () {
    cy.CreateprojectGeneraltabClient("Image Annotation");
    cy.get("input[name=customLabels]").check().should("be.checked");
  });

  it('5. Check that "Allow custom labels" box is unclicable ', function () {
    cy.CreateprojectGeneraltabClient("Image Annotation");
    cy.get("input[name=customLabels]").check().should("not.be.checked");
  });

  it("6. Check that 'back' button is clicable", function () {
    cy.CreateprojectGeneraltabClient("Image Annotation");
    cy.get("[data-testid=create-project_button_step-back]").click();
    cy.contains("General Information").should("be.visible");
  });
});
