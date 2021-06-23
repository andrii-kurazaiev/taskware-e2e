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
// Cypress.Commands.add(
//   "createproject",
//   function (loginOk, passwordOk, url, shouldEq = `/dashboard/main`) {
//     cy.visit(`${url}/signin`);
//     cy.login(loginOk, passwordOk, url);
//     cy.get('[class="sc-giIncl efCwnz"]').click();
//     shouldEq && cy.url().should("eq", `${url}${shouldEq}`);
//   }
// );

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
