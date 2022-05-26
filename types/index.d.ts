export { };

declare global {
  interface Window {
    YCPay?: any; // 👈️ turn off type checking
  }
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<Element>
    }
  }
}