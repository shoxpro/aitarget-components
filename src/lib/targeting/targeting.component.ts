import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector:    'fba-targeting',
  templateUrl: './targeting.component.html',
  styleUrls:   ['./targeting.component.scss']
})
export class TargetingComponent {

  @Input() spec;
  @Output() onChange = new EventEmitter();

  constructor () {}
}
