import config from './config'

const { loginOk, loginWrong, passwordOk, passwordWrong, url,loginRan } = config;

describe('My Client Test Suite Signup',function() // разбираюсь рандомной генирацией значений имени, емейла
{

    beforeEach(()=> {
        cy.visit(`${url}/signin`);         
    })
 

    it('1.1 Correct email and password',function()
    {   
        // cy.signup()
        cy.get('input[name = first name]').type('first_name')
        cy.get('input[name = last name]').type('Tester')
        // cy.get('input[name = email]').type(loginRan)
        // cy.get('input[name = password]').type()
        // cy.get('button[type = submit]').click()
        // cy.url().should('eq', 'https://client.dev.taskware.io/dashboard/main')
        })
    })