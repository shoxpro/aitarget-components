import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Field } from './field.interface';

@Component({
  selector:        'fba-filter-field',
  template:        `
                     <div (click)="isOpen = !isOpen">{{ field?.name }}</div>
                     <fba-dropdown-list
                       *ngIf="isOpen"
                       (fbaClickOutside)="isOpen = !isOpen"
                       [items]="fields"
                       [selectedItem]="field"
                       (onClick)="onChange.emit($event)"></fba-dropdown-list>
                   `,
  styles:          [`
    :host {
      position: relative;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterFieldComponent {
  isOpen = false;

  @Input() fields: Array<Field>;
  @Input() field: Field;

  @Output() onChange = new EventEmitter();
}
