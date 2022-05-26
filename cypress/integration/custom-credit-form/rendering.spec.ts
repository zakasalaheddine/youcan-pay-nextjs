/// <reference types="cypress" />

export { }

describe('Rendering Custom Credit Card Form Payment', () => {
  beforeEach(() => cy.visit('/custom-credit-card'))

  it('should Custom Credit Card Form exist', () => {
    cy.get('[data-cy=creditCardFormContainer]').should('be.visible')
  })

  it('should Custom Credit Card exist', () => {
    cy.get('[data-cy=creditCard]').should('be.visible')
  })
})
