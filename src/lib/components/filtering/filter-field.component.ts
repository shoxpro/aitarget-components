import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Field } from './filtering.interface';

@Component({
  selector:        'fba-filter-field',
  template:        `
                     <div (click)="isOpen = !isOpen">{{ field?.name }}</div>
                     <fba-dropdown-list
                       *ngIf="isOpen && fields?.length > 1"
                       (fbaClickOutside)="isOpen = !isOpen"
                       [items]="fields"
                       [selectedItem]="field"
                       (onClick)="isOpen = !isOpen;onChange.emit($event)"></fba-dropdown-list>
                   `,
  styles:          [`
    :host {
      position: relative;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FilterFieldComponent {
  isOpen = false;

  @Input() fields: Array<Field>;
  @Input() field: Field;

  @Output() onChange = new EventEmitter();
}
