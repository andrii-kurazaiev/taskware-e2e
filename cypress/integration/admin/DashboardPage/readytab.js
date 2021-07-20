import config from "../config";

const { loginOk, passwordOk, url } = config;

describe("My Admin ReadyTab Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
  });

  afterEach(() => {
    cy.get('[data-testid="avatar-dropdown-menu"]').click();
    cy.contains("Log out").click();
  });

  it("1. After log in displayes Ready tab", function () {
    cy.contains("STATUS").should("be.visible");
  });

  //   it("2. Check edit sign is clicable", function () {
  //     cy.get('[class="ant-btn sc-iwajpm kydRHc"]').click();
  //     cy.contains("GENERAL INFO").should("be.visible");
  //     cy.get("[class='sc-kLojOw dBCSAI']").click();
  //   });

  it("3. Check right Pagination arrow is clicable", function () {
    cy.get('[class="anticon anticon-right"]').click();
    cy.get(
      '[data-row-key="61"] > :nth-child(1) > .sc-bA-DTon > :nth-child(1)'
    ).contains("Kate");
  });

  // it("4. Check left Pagination arrow is not clicable on 1st page", function () {
  //   cy.get('[class="anticon anticon-left"]').should("be.disabled");
  // });

  it("5. Check left Pagination arrow is not clicable on 2nd page", function () {
    cy.get('[class="anticon anticon-right"]').click();
    cy.get('[class="anticon anticon-left"]').click();
    cy.get('[data-row-key="1"] > :nth-child(1)').contains("john223");
  });
});
