import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { OperatorEnum } from './equation-input/input-button-base/input-button-base.component';
import { CalculatorModule } from '../calculator.module';


describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [ CalculatorModule  ]
    });

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
  });

  it('should update the equation display', () => {
    component.updateCurrentValue(10);
    fixture.detectChanges();
    expect(component.equationDisplay).toBe('10');

    component.applyOperator(OperatorEnum.ADD);
    fixture.detectChanges();
    expect(component.equationDisplay).toBe('10 +');

    component.updateCurrentValue(12);
    fixture.detectChanges();
    expect(component.equationDisplay).toBe('10 + 12');
  });

  it('should reset values if Cancel is run', () => {
    component.currentValue = 20;
    component.equationDisplay = '20 x 2';
    component.onCancel();
    fixture.detectChanges();
    expect(component.currentValue).toBe(0);
    expect(component.equationDisplay).toBeNull();
    expect(component.result).toBeNull();
  });

  it('should reflect that an operator has been added to the equation', () => {
    component.currentValue = 20;
    component.equationDisplay = '20';
    component.applyOperator(OperatorEnum.ADD);
    fixture.detectChanges();

    expect(component.equationDisplay).toBe('20 +');
  });

  it('should only allow a new currentValue after an operator', fakeAsync(() => {
    component.updateCurrentValue(10);
    expect(component.currentValue).toBe(10);
    expect(component.equationDisplay).toBe('10');

    component.applyOperator(OperatorEnum.ADD);
    tick();

    expect(component.equationDisplay).toBe('10 +');

    component.updateCurrentValue(23);
    tick();
    expect(component.currentValue).toBe(23);
    expect(component.equationDisplay).toBe('10 + 23');
  }));

  it('should be able to concatenate onto equation', () => {
    component.updateCurrentValue(10);
    expect(component.currentValue).toBe(10);
    expect(component.equationDisplay).toBe('10');

    component.applyOperator(OperatorEnum.ADD);
    fixture.detectChanges();

    expect(component.equationDisplay).toBe('10 +');

    component.updateCurrentValue(22);
    fixture.detectChanges();

    expect(component.equationDisplay).toBe('10 + 22');

    component.applyOperator(OperatorEnum.MULTIPLY);
    fixture.detectChanges();

    expect(component.equationDisplay).toBe('10 + 22 *');

    component.updateCurrentValue(32);
    fixture.detectChanges();

    expect(component.equationDisplay).toBe('10 + 22 * 32');
  });

  it('should calculate equation and provide result if requested', () => {

    component.updateCurrentValue(10);
    component.applyOperator(OperatorEnum.ADD);
    fixture.detectChanges();
    component.updateCurrentValue(22);
    fixture.detectChanges();
    component.applyOperator(OperatorEnum.MULTIPLY);
    fixture.detectChanges();
    component.updateCurrentValue(32);
    fixture.detectChanges();
    component.applyEquals();
    fixture.detectChanges();

    expect(component.result).toBe(714);
    expect(component.currentValue).toBe(714);
    expect(component.equationDisplay).toBe('714');

  });

  it('should toggle current value to positive or negative', () => {
    component.updateCurrentValue(10);
    fixture.detectChanges();
    expect(component.currentValue).toBe(10);
    expect(component.equationDisplay).toBe('10');

    component.applyToggleNegPos();
    fixture.detectChanges();
    expect(component.currentValue).toBe(-10);
    expect(component.equationDisplay).toBe('-10');
  })

  it('should reflect 0 for result if positive and negative for teh same number are added', () => {
    component.updateCurrentValue(10);
    fixture.detectChanges();
    component.applyOperator(OperatorEnum.ADD);
    fixture.detectChanges();
    component.updateCurrentValue(10);
    fixture.detectChanges();
    component.applyToggleNegPos();
    fixture.detectChanges();
    component.applyEquals();

    expect(component.result).toBe(0);
  })

})
