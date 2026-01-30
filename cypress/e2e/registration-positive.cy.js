describe('Registration - positive', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    })
  })

  it('registers a new user with unique email', () => {
    cy.contains('Sign up').click()

    const email = `tanya+${Date.now()}@mail.com`

cy.get('#signupName').type('Tanya')
cy.get('#signupLastName').type('QA')
cy.get('#signupEmail').type(email)

cy.get('#signupPassword').type('Abcde123', { sensitive: true })
cy.get('#signupRepeatPassword').type('Abcde123', { sensitive: true })

cy.contains('button', 'Register').click()
cy.contains('Log out').should('be.visible')


  })
})
