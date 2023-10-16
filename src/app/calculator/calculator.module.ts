import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator/calculator.component';
import { EquationDisplayComponent } from 'src/app/calculator/calculator/equation-display/equation-display.component';
import { EquationInputComponent } from 'src/app/calculator/calculator/equation-input/equation-input.component';
import { CurrentEquationComponent } from './calculator/equation-display/current-equation/current-equation.component';
import { CurrentValueComponent } from './calculator/equation-display/current-value/current-value.component';
import { ResultComponent } from './calculator/equation-display/result/result.component';
import { InputButtonBaseComponent } from './calculator/equation-input/input-button-base/input-button-base.component';


@NgModule({
  declarations: [
    CalculatorComponent,
    EquationDisplayComponent,
    EquationInputComponent,
    CurrentEquationComponent,
    CurrentValueComponent,
    ResultComponent,
    InputButtonBaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CalculatorComponent]
})
export class CalculatorModule { }
