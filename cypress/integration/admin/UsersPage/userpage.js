import config from "../config";

const { loginOk, passwordOk, url } = config;

describe("My Admin UserPage Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
    cy.get(".sc-clGGWX > :nth-child(2) > :nth-child(2) > svg").click();
  });

  afterEach(() => {
    cy.get('[data-testid="avatar-dropdown-menu"]').click();
    cy.contains("Log out").click();
  });

  it("1. Open users page", function () {
    cy.contains("All users").should("be.visible");
  });

  it("2. Check that delete sign is clickable", function () {
    cy.get(
      '[data-row-key="1"] > :nth-child(3) > .sc-hHEiqL > :nth-child(1)'
    ).click();
    cy.contains("Delete user").should("be.visible");
    cy.get(".sc-kLojOw").click();
  });

  it("3. Check edit sign is clicable", function () {
    cy.get(
      '[data-row-key="1"] > :nth-child(3) > .sc-hHEiqL > :nth-child(2) > .anticon > svg'
    ).click();
    cy.contains("Personal").should("be.visible");
    cy.get(".sc-fkmfBh > .sc-giAqHp").click();
  });

  it("4. Check that helper card can be open by click on a raw", function () {
    cy.get("[data-row-key=1]").click();
    cy.contains("Personal").should("be.visible");
    cy.get(".sc-fkmfBh > .sc-giAqHp").click();
  });

  it("5. Check available sign", function () {
    cy.get(
      '[data-row-key="1"] > :nth-child(4) > :nth-child(1) > .ant-switch'
    ).click();
    cy.contains("Toggle user availability").should("be.visible");
    cy.get(".sc-kLojOw").click();
  });

  it("6. Check that Create helper is clicable", function () {
    cy.get('[class="sc-giAqHp bPisBr"]').click();
    cy.contains("Add user").should("be.visible");
    cy.get("[class='sc-kLojOw dBCSAI']").click();
  });

  it("7. Check that Cancel on Create helper card is clicable", function () {
    cy.get('[class="sc-giAqHp bPisBr"]').click();
    cy.get("[class='sc-kLojOw dBCSAI']").click();
    cy.contains("All users").should("be.visible");
  });

  it("8. Check right Pagination arrow is clicable", function () {
    cy.get('[class="anticon anticon-right"]').click();
    cy.get(
      '[data-row-key="61"] > :nth-child(1) > .sc-bA-DTon > :nth-child(1)'
    ).contains("Kate");
  });

  // it("9. Check left Pagination arrow is not clicable on 1st page", function () {
  //   cy.get('[class="anticon anticon-left"]').should("be.disabled");
  // });

  it("10. Check left Pagination arrow is not clicable on 2nd page", function () {
    cy.get('[class="anticon anticon-right"]').click();
    cy.get('[class="anticon anticon-left"]').click();
    cy.get('[data-row-key="1"] > :nth-child(1)').contains("john223");
  });
});
