import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EquationInputComponent } from './equation-input.component';
import { OperatorEnum } from './input-button-base/input-button-base.component';

describe('EquationInputComponent', () => {
  let component: EquationInputComponent;
  let fixture: ComponentFixture<EquationInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquationInputComponent],
    });

    fixture = TestBed.createComponent(EquationInputComponent);
    component = fixture.componentInstance;
  })

  it('should handle input correctly if value is not a float', () => {
    spyOn(component.currentValue, 'emit');
    const inputValue = '20';
    component.handleInput(inputValue, 'VALUE');
    expect(component.currentValue.emit).toHaveBeenCalledWith(parseInt(inputValue));
  })

  it('should handle input correctly if value is a float', () => {
    spyOn(component.currentValue, 'emit');
    const inputValue = '20.23';
    component.handleInput(inputValue, 'VALUE');
    expect(component.currentValue.emit).toHaveBeenCalledWith(parseFloat(inputValue));
  })

  it('should not emit a value if "." is entered without a decimal', () => {
    spyOn(component.currentValue, 'emit');
    const inputValue = '20.';
    component.handleInput(inputValue, 'VALUE');
    expect(component.currentValue.emit).not.toHaveBeenCalled();
  });

  it('should emit values with floats starting with 0 correctly', () => {
    spyOn(component.currentValue, 'emit');
    const newInput = '20.0123';
    component.handleInput(newInput, 'VALUE');
    expect(component.currentValue.emit).toHaveBeenCalledWith(parseFloat(newInput));
  })

  it('should reset value when Cancel is run', () => {
    spyOn(component.cancel, 'emit');
    component.currentValueInput = '20';
    component.applyCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
    expect(component.currentValueInput).toBe('');
  })

  it('should emit an operator to add to the expression', fakeAsync(() => {
    spyOn(component.addOperator, 'emit');
    component.applyOperator(OperatorEnum.ADD);
    expect(component.addOperator.emit).toHaveBeenCalledWith(OperatorEnum.ADD);

    component.applyOperator(OperatorEnum.DIVIDE);
    tick();
    expect(component.addOperator.emit).toHaveBeenCalledWith(OperatorEnum.DIVIDE);

    component.applyOperator(OperatorEnum.MULTIPLY);
    tick();
    expect(component.addOperator.emit).toHaveBeenCalledWith(OperatorEnum.MULTIPLY);

    component.applyOperator(OperatorEnum.SUBTRACT);
    tick();
    expect(component.addOperator.emit).toHaveBeenCalledWith(OperatorEnum.SUBTRACT);
  }));

  it('should reset the current value once an operator is added', fakeAsync(() => {
    spyOn(component.currentValue, 'emit');
    const inputValue = '20.23';
    component.handleInput(inputValue, 'VALUE');
    expect(component.currentValue.emit).toHaveBeenCalledWith(parseFloat(inputValue));

    component.applyOperator(OperatorEnum.MULTIPLY);
    tick();

    const newValue = '15';
    component.handleInput(newValue, 'VALUE');
    expect(component.currentValue.emit).toHaveBeenCalledWith(parseInt(newValue));
  }))

})
