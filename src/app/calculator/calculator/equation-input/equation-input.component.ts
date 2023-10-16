import { Component, Output, EventEmitter } from '@angular/core';
import { InputType, FunctionValueEnum, OperatorEnum } from './input-button-base/input-button-base.component';

export interface ButtonProps {
  classes?: string;
  label: string;
  value: any;
  type: InputType;
}

@Component({
  selector: 'app-equation-input',
  templateUrl: './equation-input.component.html',
  styleUrls: ['./equation-input.component.scss']
})
export class EquationInputComponent {

  @Output() currentValue = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();
  @Output() equals = new EventEmitter<void>();
  @Output() toggleNegPos = new EventEmitter<void>();
  @Output() addOperator = new EventEmitter<OperatorEnum>();

  currentValueInput: string = '';

  valueInputs: ButtonProps[] = [
    {
      label: '7',
      value: 7,
      type: 'VALUE',
      classes: 'col-span-1'
    }, {
      label: '8',
      value: 8,
      type: 'VALUE',
      classes: 'col-span-1'
    }, {
      label: '9',
      value: 9,
      type: 'VALUE',
      classes: 'col-span-1'
    },
    {
      label: '4',
      value: 4,
      type: 'VALUE',
      classes: 'col-span-1'
    },
    {
      label: '5',
      value: 5,
      type: 'VALUE'
    },
    {
      label: '6',
      value: 6,
      type: 'VALUE',
      classes: 'col-span-1'
    },
    {
      label: '1',
      value: 1,
      type: 'VALUE',
      classes: 'col-span-1'
    },
    {
      label: '2',
      value: 2,
      type: 'VALUE',
      classes: 'col-span-1'
    },
    {
      label: '3',
      value: 3,
      type: 'VALUE',
      classes: 'col-span-1'
    },
    {
      label: '0',
      value: 0,
      type: 'VALUE',
      classes: 'col-span-2'
    },
    {
      label: '.',
      value: '.',
      type: 'VALUE',
      classes: 'col-span-1'
    }
  ];

  operators: ButtonProps[] = [
    {
      label: '/',
      type: 'OPERATOR',
      value: OperatorEnum.DIVIDE
    }, {
      label: 'X',
      type: 'OPERATOR',
      value: OperatorEnum.MULTIPLY
    }, {
      label: '-',
      type: 'OPERATOR',
      value: OperatorEnum.SUBTRACT
    }, {
      label: '+',
      type: 'OPERATOR',
      value: OperatorEnum.ADD
    }, {
      label: '=',
      type: 'METHOD',
      value: FunctionValueEnum.EQUAL
    }
  ];

  functionInputs: ButtonProps[] = [
    {
      label: 'C',
      type: 'METHOD',
      value: FunctionValueEnum.CANCEL
    }, {
      label: '+/-',
      type: 'METHOD',
      value: FunctionValueEnum.TOGGLE_POS_NEG
    }, {
      label: '%',
      type: 'METHOD',
      value: FunctionValueEnum.PERCENTAGE
    }
  ];

  handleInput(value: any, type: InputType ) {
    switch (type) {
      case 'VALUE':
        this.updateInput(value)
        break;

      case 'METHOD':
        this.applyMethod(value);
        break;

      case 'OPERATOR':
        this.applyOperator(value);
        break;

      default:
        break;
    }
  }

  applyOperator(operator: OperatorEnum) {
    this.currentValueInput = '';

    switch (operator) {
      case OperatorEnum.ADD:
        this.addOperator.emit(OperatorEnum.ADD);
        break;
      case OperatorEnum.DIVIDE:
        this.addOperator.emit(OperatorEnum.DIVIDE);
        break;
      case OperatorEnum.MULTIPLY:
        this.addOperator.emit(OperatorEnum.MULTIPLY);
        break;
      case OperatorEnum.SUBTRACT:
        this.addOperator.emit(OperatorEnum.SUBTRACT);
        break;
      default:
        break;
    }
  }

  applyMethod(method: FunctionValueEnum) {
    switch (method) {
      case FunctionValueEnum.CANCEL:
        this.applyCancel();
        break;
      case FunctionValueEnum.EQUAL:
        this.applyEquals();
        break;
      case FunctionValueEnum.TOGGLE_POS_NEG:
        this.toggleNegPos.emit();
        break;

      default:
        break;
    }
  }

  applyEquals() {
    this.equals.emit();
    this.currentValueInput = '';
  }

  applyCancel() {
    this.currentValueInput = '';
    this.cancel.emit();
  }

  updateInput(value: any) {
    if(value === '.' && this.currentValueInput.includes(value)) return // Prevent double .

    this.currentValueInput += value.toString();

    // If last character is . dont emit value yet
    if(this.currentValueInput.charAt(this.currentValueInput.length - 1) === '.') return;

    if(value !== '.') {
      if(this.currentValueInput.includes('.')) {
        this.currentValue.emit(parseFloat(this.currentValueInput));
      } else {
        this.currentValue.emit(parseInt(this.currentValueInput));
      }
    }
  }

}
