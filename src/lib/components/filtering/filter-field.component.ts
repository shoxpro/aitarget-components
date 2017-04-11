import { Component } from '@angular/core';

@Component({
  selector: 'fba-filter-field',
  template: `
              <div (click)="isOpen = !isOpen">{{ field.name }}</div>
              <fba-dropdown-list
                *ngIf="isOpen"
                (fbaClickOutside)="isOpen = !isOpen"
                [items]="fields"
                [selectedItem]="field"
                (onClick)="selectField($event)"></fba-dropdown-list>
            `,
  styles:   [`
    :host {
      position: relative;
    }
  `]
})
export class FilterFieldComponent {
  fields = [{
    id:   '1',
    name: 'Delivery'
  }, {
    id:   '2',
    name: 'Campaign Name'
  }, {
    id:   '3',
    name: 'Adset Name'
  }, {
    id:   '4',
    name: 'Ad Name'
  }];

  field = this.fields[0];

  selectField (field) {
    this.field = field;
  }
}
