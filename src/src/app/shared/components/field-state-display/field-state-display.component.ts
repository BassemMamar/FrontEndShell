import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-state-display',
  templateUrl: './field-state-display.component.html',
  styleUrls: ['./field-state-display.component.scss']
})
export class FieldStateDisplayComponent implements OnInit {
  @Input() message: string;
  @Input() displayMessage: boolean;

  constructor() { }

  ngOnInit() {
  }

}
