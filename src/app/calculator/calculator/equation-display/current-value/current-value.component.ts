import { Component, Input } from '@angular/core';

export type CurrentValue = number;

@Component({
  selector: 'app-current-value',
  templateUrl: './current-value.component.html',
  styleUrls: ['./current-value.component.scss']
})
export class CurrentValueComponent {
@Input() value: CurrentValue = 0;

}
