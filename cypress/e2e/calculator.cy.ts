/// <reference types="cypress" />

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  });

  it('should perform basic equation', () => {
    cy.get('button').contains('1').click();
    cy.get('button').contains(' + ').click();
    cy.get('button').contains('1').click();
    cy.get('button').contains('=').click();
    cy.get('*[data-test="result"]').should('have.text', 2);
  })

  it('should perform log equation', () => {
    cy.get('button').contains('1').click();
    cy.get('button').contains('0').click();
    cy.get('button').contains(' + ').click();
    cy.get('button').contains('2').click();
    cy.get('button').contains('0').click();
    cy.get('button').contains(' - ').click();
    cy.get('button').contains('3').click();
    cy.get('button').contains('=').click();
    cy.get('*[data-test="result"]').should('have.text', 27);
  });

  it('should perform percentage calculations', () => {
    cy.get('button').contains('3').click();
    cy.get('button').contains(' + ').click();
    cy.get('button').contains('3').click();
    cy.get('button').contains(' + ').click();
    cy.get('button').contains('5').click();
    cy.get('button').contains('0').click();
    cy.get('button').contains(' % ').click();
    cy.get('button').contains('=').click();
    cy.get('*[data-test="result"]').should('have.text', 9);
  })

  it('should perform cancel', () => {
    cy.get('button').contains('3').click();
    cy.get('button').contains(' + ').click();
    cy.get('button').contains('3').click();
    cy.get('button').contains(' + ').click();
    cy.get('button').contains('5').click();
    cy.get('button').contains(' C ').click();
    cy.get('app-current-value *[data-test="current-value"]').should('have.text', ' 0\n');
  })
})
