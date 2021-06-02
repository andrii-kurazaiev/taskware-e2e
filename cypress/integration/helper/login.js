import config from './config'

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe('My Helper Login Test Suite', function () {
    beforeEach(() => {
        cy.visit(`${url}/signin`);
    })

    it('1.1 Correct email and password', function () {
        cy.login(loginOk, passwordOk, url)
    })

    it('1.2 Check that "remember me" box is clicable', function () {
        cy.get('#signinForm_remember').check().should('be.checked')

    })

    it('1.3 Check "Forgot password"',function()
    {
        cy.get('.login-form-forgot').click()
        cy.url().should('eq', `${url}/forgot-password`)
    })

    it('2.1 Incorrect Password',function()  // никак не могу воспользоватся тут фуецмей логина ибо она предпологвет переход на дешборд а нам не надо
    {
        cy.get('input[name = email]').type(loginOk)  
        cy.get('input[name = password]').type(passwordWrong)
        cy.get('button[type = submit]').click()
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('email or password is invalid!')
            done()
            return false
          })
    })
    it('2.1 Incorrect email',function() // тут тоже самое
    {
        cy.get('input[name = email]').type(loginWrong)  
        cy.get('input[name = password]').type(passwordOk)
        cy.get('button[type = submit]').click()
            cy.on('uncaught:exception', (err, runnable) => {
                expect(err.message).to.include('email or password is invalid!')
                done()
                return false
              })
            })

    it('2.2 Incorrect email and password',function()// тут тоже самое
    {
        cy.get('input[name = email]').type(loginWrong)  
        cy.get('input[name = password]').type(passwordWrong)
        cy.get('button[type = submit]').click()
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('email or password is invalid!')
            done()
            return false
          })
        })

    it('2.3 Leave both fields blank. Attempt to login.',function()
    {
            cy.get('button[type = submit]').click()
            cy.get(':nth-child(1) > .ant-col > .ant-form-item-explain > div')
            cy.get(':nth-child(1) > .ant-col > .ant-form-item-explain > div')
    })

    it('2.4 Leave the login field empty. Attempt to login.',function()
    {
        cy.get('input[name = password]').type(passwordOk)
        cy.get('button[type = submit]').click()
        cy.get(':nth-child(1) > .ant-col > .ant-form-item-explain > div')
})

    it('2.5 Leave the password blank. Attempt to login.',function()
    {
        cy.get('input[name = email]').type(loginOk)
        cy.get('button[type = submit]').click()
        cy.get(':nth-child(1) > .ant-col > .ant-form-item-explain > div')
})

it('3.1.1 enter only symbols to email field',function()
{
        cy.get('input[name = email]').type('!@#>?<%^&*((')
        cy.get(':nth-child(1) > .ant-col > .ant-form-item-explain > div')
})


})