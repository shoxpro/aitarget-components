import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Operator } from './operator.interface';

@Component({
  selector:        'fba-filter-operator',
  template:        `
                     <div (click)="isOpen = !isOpen">{{ operator?.name }}</div>
                     <fba-dropdown-list
                       *ngIf="isOpen"
                       (fbaClickOutside)="isOpen = !isOpen"
                       [items]="operators"
                       [selectedItem]="operator"
                       (onClick)="onChange.emit($event)"></fba-dropdown-list>
                   `,
  styles:          [`
    :host {
      position: relative;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterOperatorComponent {
  @Input() operators: Array<Operator>;
  @Input() operator: Operator;

  @Output() onChange = new EventEmitter();
}
