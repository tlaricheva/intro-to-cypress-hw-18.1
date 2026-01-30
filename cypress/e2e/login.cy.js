describe('Login', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    })
  })

  it('logs in successfully', () => {
    cy.login('guest', 'welcome2qauto')

    cy.contains('button', 'Log out').should('be.visible')
  })
})
