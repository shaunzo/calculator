import { Component, Input, Output, EventEmitter } from '@angular/core';

export type InputType = 'VALUE' | 'OPERATOR' | 'METHOD';

export type ValueInput = number | '.';

export enum FunctionValueEnum {
  CANCEL,
  TOGGLE_POS_NEG,
  PERCENTAGE,
  EQUAL
}

export enum OperatorEnum {
  DIVIDE,
  MULTIPLY,
  SUBTRACT,
  ADD,
}

@Component({
  selector: 'app-input-button-base',
  templateUrl: './input-button-base.component.html',
  styleUrls: ['./input-button-base.component.scss']
})
export class InputButtonBaseComponent {
  @Input() classes: string = '';
  @Input() label: string = '';
  @Input() value: any = null;
  @Input() type: InputType = 'VALUE';
  @Output() valueEmmited = new EventEmitter<any>();

  onButtonClick() {
    this.valueEmmited.emit(this.value);
  }

}
