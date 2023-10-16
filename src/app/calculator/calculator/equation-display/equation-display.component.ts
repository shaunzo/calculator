import { Component, Input } from '@angular/core';
import { equation } from './current-equation/current-equation.component';
import { CurrentValue } from './current-value/current-value.component';
import { Result } from './result/result.component';

@Component({
  selector: 'app-equation-display',
  templateUrl: './equation-display.component.html',
  styleUrls: ['./equation-display.component.scss']
})
export class EquationDisplayComponent {
  @Input() equation: equation= null;
  @Input() currentValue: CurrentValue = 0;
  @Input() result: Result = null;

}
