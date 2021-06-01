import config from './config'

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe('My Admin Test Suite', function () {
    beforeEach(() => {
        cy.visit(`${url}/signin`);
    })

    it('1.1 Correct email and password', function () {
        cy.login(loginOk, passwordOk, url)
    })

    it('1.2 Check "remember me" box', function () {
        cy.get('#signinForm_remember').check().should('be.checked')
        cy.login(loginOk, passwordOk, url)
        cy.get('[data-testid=avatar-dropdown-menu]').click()
        cy.get('[role=menuitem]:nth-child(2)').click()
    })
})