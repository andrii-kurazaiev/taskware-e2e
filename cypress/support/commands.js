import "cypress-file-upload";
import "cypress-wait-until";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "login",
  (email, password, url, shouldContains = `PROJECTS`) => {
    cy.get("input[name = email]").type(email);
    cy.get("input[name = password]").type(password);
    cy.get("button[type = submit]").click();
    shouldContains && cy.contains(shouldContains).should("be.visible");
  }
);
Cypress.Commands.add("CreateprojectGeneraltab", (projectType) => {
  cy.get('[class="ant-select-selection-search-input"]').click();
  cy.get('[class="ant-select-item-option-content"]')
    .contains("My best company", { matchCase: false })
    .click();
  cy.get("input[type=text]").typeRandomName();
  cy.get('[class="ant-typography"]')
    .contains(projectType, {
      matchCase: false,
    })
    .click();
  cy.fixture("2pic.zip")
    .as("FileUpload")
    .then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "2pic.zip",
        mimeType: "application/zip",
      });
    });
  cy.wait(6000);
  cy.get("[data-testid=create-project_button_step-next]").click();
});

Cypress.Commands.add("CreateprojectGeneraltabClient", (projectType) => {
  cy.get("input[type=text]").typeRandomName();
  cy.get('[class="ant-typography"]')
    .contains(projectType, {
      matchCase: false,
    })
    .click();
  cy.fixture("2pic.zip")
    .as("FileUpload")
    .then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "2pic.zip",
        mimeType: "application/zip",
      });
    });
  cy.wait(6000);
  cy.get("[data-testid=create-project_button_step-next]").click();
});

Cypress.Commands.add("CreateprojectSetuplabels", () => {
  cy.get('input[name="labels"]').type("test{enter}");
  cy.get("[data-testid=create-project_button_step-next]").click();
});

Cypress.Commands.add("CreateprojectUploadinst", (ShortInstruction) => {
  cy.fixture("instructions.pdf").then((fileContent) => {
    cy.get('input[type="file"]').attachFile({
      fileContent: fileContent.toString(),
      fileName: "instructions.pdf",
      mimeType: "application/pdf",
    });
  });
  cy.wait(2000);
  cy.get(ShortInstruction).type("Need to be done asap!");
  cy.get("[data-testid=create-project_button_step-next]").click();
});

Cypress.Commands.add("CreateprojectSetupprices", () => {
  cy.get("[id=helperRate]").type("1");
  cy.get("[id=auditorRate]").type("1");
  cy.get("[data-testid=create-project_button_step-next]").click();
});
Cypress.Commands.add("CreateprojectDone", () => {
  cy.contains(
    "CONGRATULATIONS, YOU'RE ALL DONE! We will review your request and will get back to you shortly!"
  ).should("be.visible");
  cy.get(
    "[data-testid=create-project_button_step-next_save-without-helpers]"
  ).click();
});
Cypress.Commands.add("CreateprojectE2E", (projectType) => {
  cy.get('[data-testid="add-project-button"]').click();
  cy.get('[class="ant-select-selection-search-input"]').click();
  cy.get('[class="ant-select-item-option-content"]')
    .contains("My best company", { matchCase: false })
    .click();
  cy.get("input[type=text]").typeRandomName();
  cy.get('[class="ant-typography"]')
    .contains(projectType, {
      matchCase: false,
    })
    .click();
  cy.fixture("2pic.zip")
    .as("FileUpload")
    .then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "2pic.zip",
        mimeType: "application/zip",
      });
    });
  cy.wait(5000);
  cy.get("[data-testid=create-project_button_step-next]").click();
  cy.get('input[name="labels"]').type("test{enter}");
  cy.get("[data-testid=create-project_button_step-next]").click();
  cy.fixture("instructions.pdf").then((fileContent) => {
    cy.get('input[type="file"]').attachFile({
      fileContent: fileContent.toString(),
      fileName: "instructions.pdf",
      mimeType: "application/pdf",
    });
  });
  cy.wait(2000);
  cy.get('textarea[name="adminShortInstruction"]').type(
    "Need to be done asap!"
  );
  cy.get("[data-testid=create-project_button_step-next]").click();
  cy.get("[id=helperRate]").type("1");
  cy.get("[id=auditorRate]").type("1");
  cy.get("[data-testid=create-project_button_step-next]").click();
  cy.contains(
    "CONGRATULATIONS, YOU'RE ALL DONE! We will review your request and will get back to you shortly!"
  ).should("be.visible");
  cy.get(
    "[data-testid=create-project_button_step-next_save-without-helpers]"
  ).click();
});

Cypress.Commands.add(
  "typeRandomName",
  { prevSubject: true },
  (
    subject,
    { useIncorrectChars, length } = {
      useIncorrectChars: false,
      length: 10,
    }
  ) => {
    let text = "";
    const incorrectChars = "!@#>?<%^&*((";
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return cy.wrap(subject).type(text);
  }
);

Cypress.Commands.add(
  "typeRandomPassword",
  { prevSubject: true },
  (
    subject,
    {
      length,
      amountSpecialChars,
      amountUpperChars,
      amountLowerChars,
      amountDigits,
    } = {
      length: 8,
      amountSpecialChars: 2,
      amountUpperChars: 3,
      amountLowerChars: 4,
      amountDigits: 3,
    }
  ) => {
    let text = "";
    const specialChars = "!@#-=+";
    const upperChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const lowerChars = `abcdefghijklmnopqrstuvwxyz`;
    const digits = `0123456789`;

    for (let i = 0; i < amountSpecialChars; i++)
      text += specialChars.charAt(
        Math.floor(Math.random() * specialChars.length)
      );
    for (let i = 0; i < amountUpperChars; i++)
      text += upperChars.charAt(Math.floor(Math.random() * lowerChars.length));
    for (let i = 0; i < amountLowerChars; i++)
      text += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
    for (let i = 0; i < amountDigits; i++)
      text += digits.charAt(Math.floor(Math.random() * amountDigits.length));

    return cy.wrap(subject).type(text);
  }
);

Cypress.Commands.add("createEmail", () => {
  cy.mailslurp()
    .then((mailslurp) => mailslurp.createInbox())
    .then((inbox) => {
      cy.wrap(inbox.id).as("inboxId");
      cy.wrap(inbox.emailAddress).as("emailAddress");
    });
});

Cypress.Commands.add("deleteEmail", function () {
  cy.mailslurp().then((mailslurp) => {
    mailslurp.deleteInbox(this.inboxId);
  });
});
