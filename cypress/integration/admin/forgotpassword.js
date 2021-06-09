/// <reference types="Cypress" />
import config from './config'

const { loginOk, loginWrong, passwordOk, passwordWrong, url } = config;

describe('My Admin Test Suite',function()
{

    beforeEach(()=> {
        cy.visit(`${url}/forgot-password`);         
    })

    it('Correct email ',function()
    {   
        cy.get('input[name = email]').type(loginOk)
        cy.get('button[type = submit]').click()
        cy.wait(5000)
        cy.url().should('eq', `${url}/rest`)
        })
    
    it('Incorrect email ',function()
    {   
        cy.get('input[name = email]').type(loginWrong)
        cy.get('button[type = submit]').click()
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('password reset failed.')
            done()
            return false
          })
        })
    })