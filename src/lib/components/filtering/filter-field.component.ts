import { Component, Input, OnInit } from '@angular/core';
import { FieldsService } from './fields.service';
import { Field } from './field.interface';

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
export class FilterFieldComponent implements OnInit {
  fields: Array<Field>;
  field: Field;
  isOpen = true;

  @Input() filterStream;

  selectField (field: Field) {
    this.field = field;

    let filter   = this.filterStream.getValue();
    filter.field = field.id;

    this.filterStream.next(filter);
  }

  ngOnInit () {
    this.fields = this.fieldsService.get();

    let filter = this.filterStream.getValue();
    this.field = this.fields.find((field) => field.id === filter.id) || this.fields[0];
  }

  constructor (private fieldsService: FieldsService) {}
}
