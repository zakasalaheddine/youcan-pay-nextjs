/// <reference types="cypress" />

export { }
require("../../../mocks")
describe('Rendering Custom Credit Card Form Payment', () => {
  before(() => { cy.visit('/custom-credit-card') })

  it('should Custom Credit Card Form exist', () => {
    cy.get('[data-cy=creditCardFormContainer]').should('be.visible')
  })

  it('should Custom Credit Card exist', () => {
    cy.get('[data-cy=creditCard]').should('be.visible')
  })

  it('should render Card Number Form With No Error', () => {
    cy.get('[data-cy=cardNumberForm]').should('be.visible')
    cy.get('[data-cy=cardNumberForm]').contains('Card Number')
    cy.get('[data-cy=cardNumberForm]').get('[data-cy=cardNumberInput]').should('be.visible')
    cy.get('[data-cy=cardNumberForm]').get('[data-cy=cardNumberError]').should('not.exist')
  })
})
