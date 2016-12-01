import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fba-targeting-form-add',
  template: `<a href="" (click)="add.emit($event)">Add New</a>`,
  styles:   [`:host {
                margin-top: 10px;
                font-size: 12px;
              }
            `]
})
export class TargetingFormAddComponent {
  @Output() add = new EventEmitter();
}
