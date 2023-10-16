import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputButtonBaseComponent } from './input-button-base.component';

describe('InputButtonBaseComponent', () => {
  let component: InputButtonBaseComponent;
  let fixture: ComponentFixture<InputButtonBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputButtonBaseComponent],
    });

    fixture = TestBed.createComponent(InputButtonBaseComponent);
    component = fixture.componentInstance;
  })

  it('should emit correct value when click handler runs', () => {
    spyOn(component.valueEmmited, 'emit');

    const expectedEmitValue = 20;

    component.type = 'VALUE';
    component.label = 'My Label';
    component.value = expectedEmitValue;

    // Trigger click
    component.onButtonClick();

    fixture.detectChanges();

    expect(component.valueEmmited.emit).toHaveBeenCalled();

    const emittedValue = (component.valueEmmited.emit as jasmine.Spy).calls.mostRecent().args[0];

    expect(emittedValue).toBe(expectedEmitValue)
  })

})
