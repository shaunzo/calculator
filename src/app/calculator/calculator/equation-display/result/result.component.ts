import { Component, Input } from '@angular/core';

export type Result = number | null;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() value: Result = null;

}
