import config from './config'

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe('My Client Test Suite', function () {
    beforeEach(() => {
        cy.visit(`${url}/signin`);
    })

    it('1.1 Correct email and password', function () {
        cy.login(loginOk, passwordOk, url)
    })
})