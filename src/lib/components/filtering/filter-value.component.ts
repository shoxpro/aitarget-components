import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Field, Item } from './filtering.interface';

@Component({
  selector: 'fba-filter-value',
  template: `
              <div class="select"
                   *ngIf="field?.input === 'select'">
                <div class="ellipsis"
                     (click)="isOpen = !isOpen">{{ displayValue || '–' }}
                </div>
                <fba-dropdown-list
                  *ngIf="isOpen"
                  (fbaClickOutside)="isOpen = !isOpen"
                  [items]="values"
                  [selectedItem]="processedValue"
                  [multiple]="field.multiple"
                  (onClick)="changed($event)"></fba-dropdown-list>
              </div>
              <div class="input"
                   *ngIf="field?.input === 'input'">
                <input type="text"
                       #input
                       [value]="value"
                       (keyup)="inputValueChanged(input.value)">
              </div>`,
  styles: [`
    :host {
      position: relative;
      padding:  0 !important;
    }

    .ellipsis {
      text-overflow: ellipsis;
      max-width:     200px;
      overflow:      hidden;
    }

    .select {
      padding: 0 4px;
    }

    .input {
      position: relative;
      width:    92px;
      height:   100%;
    }

    input {
      background-color: #ffffff;
      border-width:     0;
      border-radius:    3px;
      box-sizing:       border-box;
      height:           100%;
      margin:           0;
      outline:          none;
      padding:          2px 4px 2px 8px;
      width:            100%;
    }
  `]
})
export class FilterValueComponent {
  values: Array<Item>         = [];
  processedValue: Array<Item> = [];
  displayValue: string;

  // ===== field =====
  _field;
  @Input()
  set field (val: Field) {
    /**
     * Create values array compatible with fba-dropdown-list component
     */
    if (val.input === 'select' && val.values) {
      this.values = [];
      for (let key in val.values) {
        if (val.values.hasOwnProperty(key)) {
          this.values.push({id: key, name: val.values[key]});
        }
      }
    } else {
      setTimeout(() => {
        let input = this.elementRef.nativeElement.querySelector('input');
        if (input) {
          input.focus();
        }
      });
    }

    this._field = val;
  };

  get field () {
    return this._field;
  }

  // ===== field =====

  // ===== value =====
  _value: undefined | string | number | Array<string> = '';
  @Input()
  set value (val: undefined | string | number | Array<string>) {
    if (typeof val === 'undefined') {
      this._value = '';
      return;
    }

    this._value = val;

    if (this.field.input === 'select') {
      this.processedValue = (Array.isArray(val) ? val : val.toString()
                                                           .split(', '))
        .map((id) => {
          return {id: id, name: this.field.values[id]};
        });

      this.setDisplayName(this.processedValue);
    }
  }

  get value () {
    return this._value;
  }

  // ===== value =====

  @Output() onChange = new EventEmitter();

  setDisplayName (items: Item[]) {
    this.displayValue = items.map((_) => _.name)
                             .join(', ');
  }

  changed (item) {
    if (Array.isArray(item)) {
      this.onChange.emit(item.map((_) => _.id));
      this.setDisplayName(item);
    } else {
      this.onChange.emit(item.id);
      this.setDisplayName([item]);
    }
  }

  inputValueChanged (value) {
    if (this.field.multiple) {
      this.onChange.emit(value.split(',')
                              .map((item) => item.trim()));
    } else {
      this.onChange.emit(value);
    }
  }

  constructor (private elementRef: ElementRef) {}
}
