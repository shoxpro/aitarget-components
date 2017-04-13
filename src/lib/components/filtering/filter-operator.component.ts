import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Operator } from './filtering.interface';

@Component({
  selector:        'fba-filter-operator',
  template:        `
                     <div (click)="isOpen = !isOpen">{{ operator?.name }}</div>
                     <fba-dropdown-list
                       *ngIf="isOpen"
                       (fbaClickOutside)="isOpen = !isOpen"
                       [items]="processedOperators"
                       [selectedItem]="operator"
                       (onClick)="isOpen = !isOpen;onChange.emit($event.id)"></fba-dropdown-list>
                   `,
  styles:          [`
    :host {
      position: relative;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterOperatorComponent {
  processedOperators = [];
  // ===== operators =====
  _operators;
  @Input()
  set operators (val: Operator) {
    this._operators = val;
    /**
     * Create values array compatible with fba-dropdown-list component
     */
    for (let key in val) {
      if (val.hasOwnProperty(key)) {
        this.processedOperators.push({id: key, name: val[key]});
      }
    }
  };

  get operators () {
    return this._operators;
  }

  // ===== operators =====

  // ===== operator =====
  _operator;
  @Input()
  set operator (val: undefined | string) {
    if (typeof val === 'undefined') {
      return;
    }

    this._operator = {id: val, name: this.operators[val]};
  }

  get operator () {
    return this._operator;
  }

  // ===== operator =====

  @Output() onChange = new EventEmitter();
}
