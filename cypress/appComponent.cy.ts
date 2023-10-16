/// <reference types="cypress" />

import { AppComponent } from "src/app/app.component";
import { CalculatorModule } from "src/app/calculator/calculator.module";


describe('appComponent.cy.ts', () => {
  beforeEach(() => {
    cy.mount(AppComponent, {
      declarations: [],
      imports: [CalculatorModule]
    });
  });

  it('should show the calculator component', () => {
    cy.get('app-calculator').should('be.visible');
  });

})
