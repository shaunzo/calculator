import { Component, Input } from '@angular/core';

export type equation = string | null;

@Component({
  selector: 'app-current-equation',
  templateUrl: './current-equation.component.html',
  styleUrls: ['./current-equation.component.scss']
})
export class CurrentEquationComponent {
  @Input() equation: equation  = null;

}
