import config from "../config";

const { loginOk, passwordOk, url } = config;

describe("My Admin HelperCard Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
    cy.get(".sc-clGGWX > :nth-child(2) > :nth-child(2) > svg").click();
    cy.get("[data-row-key=1]").click();
  });

  afterEach(() => {
    cy.get(".sc-fkmfBh > .sc-giAqHp").click();
    cy.get('[data-testid="avatar-dropdown-menu"]').click();
    cy.contains("Log out").click();
  });

  it("1. Helper card is opened on personal tab", function () {
    cy.contains("Created At").should("be.visible");
  });

  it("2. Helper card is switched to  performance tab", function () {
    cy.get(".ant-tabs-nav-list > :nth-child(2)").click();
    cy.contains("Projects").should("be.visible");
  });

  it("3. Helper card is switched to  statistic tab", function () {
    cy.get(".ant-tabs-nav-list > :nth-child(3)").click();
    cy.contains("SUBMITTED TASKS").should("be.visible");
  });

  it("4. Edit icon is clicable on Helper card", function () {
    cy.get(".editButton").click();
    cy.contains("First Name").should("be.visible");
  });

  it("5. Edit first name on Helper card", function () {
    cy.get(".editButton").click();
    cy.get("input[name=first_name]").type(1);
    cy.get('[class="sc-giAqHp cIKLGn"]').click();
  });

  it("6. Erase changes first name on Helper card", function () {
    cy.get(".editButton").click();
    cy.get("input[name=first_name]").type("{backspace}");
    cy.get('[class="sc-giAqHp cIKLGn"]').click();
  });
});
