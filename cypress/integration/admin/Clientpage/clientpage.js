import config from "../config";

const { loginOk, loginWrong, passwordOk, passwordWrong, url, userpage } =
  config;

describe("My Admin ClientPage Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
    cy.get("#rc-tabs-1-tab-Clients").click();
  });

  afterEach(() => {
    cy.get('[data-testid="avatar-dropdown-menu"]').click();
    cy.contains("Log out").click();
  });

  it("1. Open clients page", function () {
    cy.contains("CLIENT NAME").should("be.visible");
  });

  it("2. Check that delete sign is clickable", function () {
    cy.get(
      '[data-row-key="11"] > :nth-child(4) > .sc-hHEiqL > :nth-child(1) > .anticon > svg'
    ).click();
    cy.contains("Delete client").should("be.visible");
    cy.get(".sc-kLojOw").click();
  });

  it("3. Check edit sign is clicable", function () {
    cy.get(
      '[data-row-key="11"] > :nth-child(4) > .sc-hHEiqL > :nth-child(2) > .anticon > svg'
    ).click();
    cy.contains("Edit client").should("be.visible");
    cy.get("[class='sc-kLojOw dBCSAI']").click();
  });

  it("4. Check that Create client is clicable", function () {
    cy.get('[class="sc-giAqHp bPisBr"]').click();
    cy.contains("Add client").should("be.visible");
    cy.get("[class='sc-kLojOw dBCSAI']").click();
  });

  it("5. Check that Cancel on Create client card is clicable", function () {
    cy.get(":nth-child(2) > .sc-giAqHp").click();
    cy.get("[class='sc-kLojOw dBCSAI']").click();
    cy.contains("CLIENT NAME").should("be.visible");
  });

  //   it("6. Check right Pagination arrow is clicable", function () {
  //     cy.get('[class="ant-pagination-next"]').click();
  //     cy.get('[data-row-key="41"] > :nth-child(1)').contains("Kate");
  //   });

  //   it("7. Check left Pagination arrow is not clicable on 2nd page", function () {
  //     cy.get('[class="anticon anticon-right"]').click();
  //     cy.get('[class="anticon anticon-left"]').click();
  //     cy.get('[data-row-key="11"] > :nth-child(1)').contains("client");
  //   });
});
