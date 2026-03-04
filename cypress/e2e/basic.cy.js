describe('Basic test', () => {
  it('opens example site', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
  })
})
