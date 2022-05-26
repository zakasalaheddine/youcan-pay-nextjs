/// <reference types="cypress" />

export { }

describe('Rendering Custom Credit Card Form Payment', () => {
  beforeEach(() => cy.visit('/custom-credit-card'))

  it('should have the heading and pay button', () => {
    cy.get('[data-cy=creditCardFormContainer]').should('be.visible')
  })
})
