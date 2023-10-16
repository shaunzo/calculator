import { Component } from '@angular/core';
import { OperatorEnum } from './equation-input/input-button-base/input-button-base.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  currentValue: number = 0;
  equationDisplay: string | null = null;
  result: number | null = null;
  isNegative: boolean = false;

  updateCurrentValue(value:number) {

    this.currentValue = value;

    this.updateEquationDisplay(value);
  }

  updateEquationDisplay(value:number) {
    if(!this.equationDisplay) {
      this.equationDisplay =`${value}`;
    } else {
      const stringArray = this.equationDisplay?.split(' ');

      if(this.isLastInputAnOperator()) {
        this.equationDisplay = `${stringArray.join(' ')} ${value}`;
      } else {
        stringArray[stringArray.length - 1] = value.toString();
        this.equationDisplay = stringArray.join(' ');
      }
    }
  }

  applyOperator(operator: OperatorEnum) {
    let operatorChar = null;

    switch (operator) {
      case OperatorEnum.ADD:
        operatorChar = '+';
        break;
      case OperatorEnum.DIVIDE:
        operatorChar = '/';
        break;
      case OperatorEnum.MULTIPLY:
        operatorChar = '*';
        break;
      case OperatorEnum.SUBTRACT:
        operatorChar = '-';
        break;
      default:
        break;
    }

    if(this.equationDisplay && operatorChar) {
      this.equationDisplay += ` ${operatorChar}`;
    }
  }

  onCancel() {
    this.currentValue = 0;
    this.equationDisplay = null;
    this.result = null;
  }

  applyEquals() {
    if(this.equationDisplay) {
      this.result = this.calculateExpression(this.equationDisplay);

      if(this.result) {
        this.currentValue = this.result;
        this.equationDisplay = `${this.result}`;
      } else {
        this.result = 0;
        this.currentValue = this.result;
        this.equationDisplay = null;
      }
    }
  }

  applyToggleNegPos() {
    if(!this.isLastInputAnOperator()) {
      this.isNegative = !this.isNegative;

      this.currentValue = this.currentValue * -1;
      this.updateEquationDisplay(this.currentValue);
      this.isNegative = false;
    }
  }

  calculateExpression(expression: string) {
    try {
      // Use eval() to evaluate the expression
      const result = eval(expression);

      // Check if the result is a valid number
      if (typeof result === 'number' && isFinite(result)) {
        return result;
      } else {
        throw new Error('Invalid result');
      }
    } catch (error) {
      // Handle any errors that might occur during evaluation
      console.error('Error:', error);
      return null; // Return null in case of an error
    }
  }

  isLastInputAnOperator() {
    const operator = this.equationDisplay?.charAt(this.equationDisplay.length - 1);
    if(operator) {
      return ['+', '-', '/', '*'].includes(operator);
    }
    return false;
  }

}
