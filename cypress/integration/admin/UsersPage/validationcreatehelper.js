import config from "../config";

const { loginOk, passwordOk, url } = config;

describe("My Admin UserPage Test Suite", function () {
  beforeEach(() => {
    cy.visit(`${url}/signin`);
    cy.login(loginOk, passwordOk, url);
    cy.get(".sc-clGGWX > :nth-child(2) > :nth-child(2) > svg").click();
    cy.get('[class="sc-giAqHp bPisBr"]').click();
  });

  afterEach(() => {
    cy.get(".ant-modal-close-x > .anticon > svg").click();
    cy.get('[data-testid="avatar-dropdown-menu"]').click();
    cy.contains("Log out").click();
  });

  it("1. Email alert", function () {
    cy.get("button[type = submit]").click();
    cy.contains("Must not be empty").should("be.visible");
  });

  it("2. Firstname alert", function () {
    cy.get("button[type = submit]").click();
    cy.contains("Please enter a valid project name!").should("be.visible");
  });

  it("3. Lastname alert", function () {
    cy.get("button[type = submit]").click();
    cy.contains("Please enter a valid project name!").should("be.visible");
  });

  it("4. Enter only symbols to email field", function () {
    cy.get("#antd-modal-form_email").type("!@#>?<%^&*((");
    cy.contains("Must be valid email").should("be.visible");
  });

  it("5. Enter email without dots in the domain part", function () {
    cy.get("#antd-modal-form_email").type("admin@testcom");
    cy.contains("Must be valid email").should("be.visible");
  });

  it("6. Enter email without @ in email", function () {
    cy.get("#antd-modal-form_email").type("admintest.com");
    cy.contains("Must be valid email").should("be.visible");
  });

  it("7. Enter correct email followed by a few spaces", function () {
    cy.get("#antd-modal-form_email").type("admin@test.com  ");
    cy.contains("Must be valid email").should("be.visible");
  });

  it("8. Enter correct email  starting with multiple spaces", function () {
    cy.get("#antd-modal-form_email").type("  admin@test.com");
    cy.contains("Must be valid email").should("be.visible");
  });

  it("9. Email with numbers in the domain part", function () {
    cy.get("#antd-modal-form_email").type("111@test.com");
    cy.contains("Must be valid email").should("not.be.visible");
  });

  //   it("10. Email with numbers in the domain part", function () {
  //     cy.get("#antd-modal-form_email").type("111@test.com");
  //     cy.get(`[aria-label="check-circle"]`).should("be.visible");
  //   });

  //   it("11. Email with a hyphen in the account name", function () {
  //     cy.get("#antd-modal-form_email").type("1-11@test.com");
  //     cy.get(`[aria-label="check-circle"]`).should("be.visible");
  //   });

  //   it("12. Email with underscore in the account name", function () {
  //     cy.get("#antd-modal-form_email").type("1_11@test.com");
  //     cy.get(`[aria-label="check-circle"]`).should("be.visible");
  //   });

  //   it("13. Email with underscore in the domain name", function () {
  //     cy.get("#antd-modal-form_email").type("111@te_st.com");
  //     cy.get(`[aria-label="check-circle"]`).should("be.visible");
  //   });

  //   it("14 Email with a hyphen in the domain name", function () {
  //     cy.get("#antd-modal-form_email").type("111@te-st.com");
  //     cy.get(`[aria-label="check-circle"]`).should("be.visible");
  //   });

  it("15. Enter non latin letters in First name field", function () {
    cy.get("#antd-modal-form_first_name").type("Ф");
    cy.contains("Must contain at least one letter").should("be.visible");
  });

  it("16. Enter numbers in First name field", function () {
    cy.get("#antd-modal-form_first_name").type("12");
    cy.contains("Must contain at least one letter").should("be.visible");
  });

  it("17. Enter special symbols in First name field", function () {
    cy.get("#antd-modal-form_first_name").type("!");
    cy.contains("Must contain at least one letter").should("be.visible");
  });
  it("18. Enter space  in First name field", function () {
    cy.get("#antd-modal-form_first_name").type(" ");
    cy.contains("Must contain at least one letter").should("be.visible");
  });

  it("19. Enter non latin letters in Last name field", function () {
    cy.get("#antd-modal-form_last_name").type("Ф");
    cy.contains("Must contain at least one letter").should("be.visible");
  });

  it("20. Enter numbers in Last name field", function () {
    cy.get("#antd-modal-form_last_name").type("12");
    cy.contains("Must contain at least one letter").should("be.visible");
  });

  it("21. Enter special symbols in Last name field", function () {
    cy.get("#antd-modal-form_last_name").type("!");
    cy.contains("Must contain at least one letter").should("be.visible");
  });

  it("22. Enter space  in Last name field", function () {
    cy.get("#antd-modal-form_last_name").type(" ");
    cy.contains("Must contain at least one letter").should("be.visible");
  });
});
