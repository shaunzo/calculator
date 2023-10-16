/// <reference types="cypress" />

import { EquationDisplayComponent } from "src/app/calculator/calculator/equation-display/equation-display.component"
import { CurrentEquationComponent } from "src/app/calculator/calculator/equation-display/current-equation/current-equation.component"
import { CurrentValueComponent } from "src/app/calculator/calculator/equation-display/current-value/current-value.component"
import { ResultComponent } from "src/app/calculator/calculator/equation-display/result/result.component"

describe('EquationDisplay.cy.ts', () => {
  beforeEach(() => {
  })

  it('should display the current equation only if equation exists', () => {
    cy.mount(EquationDisplayComponent, {
      declarations: [CurrentEquationComponent],
      componentProperties: {
        equation: '1+2'
      }
    })

    cy.get('app-current-equation').should('be.visible');

    cy.mount(EquationDisplayComponent, {
      declarations: [CurrentEquationComponent],
      componentProperties: {
        equation: null
      }
    })

    cy.get('app-current-equation').should('not.be.visible');
  })

  it('should display current-value only if result has not been calculated', () => {

    cy.mount(EquationDisplayComponent, {
      declarations: [CurrentValueComponent, ResultComponent],
      componentProperties: {
        result: null
      }
    });
    cy.get('app-current-value').should('be.visible');

    cy.mount(EquationDisplayComponent, {
      declarations: [CurrentValueComponent, ResultComponent],
      componentProperties: {
        result: 20
      }
    });

    cy.get('app-current-value').should('not.exist');
  })

  it('should display result only if a result exists', () => {
    cy.mount(EquationDisplayComponent, {
      declarations: [CurrentValueComponent, ResultComponent],
      componentProperties: {
        result: null
      }
    });
    cy.get('app-result').should('not.exist');

    cy.mount(EquationDisplayComponent, {
      declarations: [CurrentValueComponent, ResultComponent],
      componentProperties: {
        result: 10
      }
    });
    cy.get('app-result').should('be.visible');
  })
})
