import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fba-targeting-form-add',
  template: `<button
  md-raised-button
  (click)="add.emit($event)">Add New
</button>`,
  styles:   [`:host {
  margin-top: 10px;
}`]
})
export class TargetingFormAddComponent {
  @Output() add = new EventEmitter();
}
