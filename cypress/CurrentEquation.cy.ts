/// <reference types="cypress" />

import { CurrentEquationComponent } from "src/app/calculator/calculator/equation-display/current-equation/current-equation.component"

describe('CurrentEquation.cy.ts', () => {
  it('should not display anything if there is no equation', () => {
    cy.mount(CurrentEquationComponent, {
      componentProperties: {
        equation: null
      }
    });

    cy.get('.current-equation-value').should('not.exist');
  })

  it('should update to display the equation if it exists', () => {
    cy.mount(CurrentEquationComponent, {
      componentProperties: {
        equation: '1 + 2'
      }
    });

    cy.get('.current-equation-value').should('be.visible');
    cy.get('.current-equation-value').should('contain.text', '1 + 2');
  })
})
