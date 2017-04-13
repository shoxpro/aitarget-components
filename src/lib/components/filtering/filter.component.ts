import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Field, Filter, Operator } from './filtering.interface';
import { FieldsService } from './fields.service';

@Component({
  selector:        'fba-filter',
  template:        `
                     <fba-filter-field class="filter-item"
                                       [fields]="fields"
                                       [field]="field"
                                       (onChange)="field$.next($event)"></fba-filter-field>
                     <fba-filter-operator class="filter-item"
                                          [operators]="field?.operator"
                                          [operator]="operator"
                                          (onChange)="operator$.next($event)"></fba-filter-operator>
                     <fba-filter-value class="filter-item"
                                       [field]="field"
                                       [value]="value"
                                       (onChange)="value$.next($event)"></fba-filter-value>
                     <fba-close class="remove"
                                *ngIf="!hideRemove"
                                (onClose)="remove()"></fba-close>
                   `,
  styles:          [`
    :host {
      display:             inline-flex;
      align-items:         center;
      height:              30px;
      background:          #ffffff;
      border:              solid 1px #dddfe2;
      border-radius:       4px;
      margin:              4px;
      max-width:           100%;
      padding:             2px 4px;
      -webkit-user-select: none;
      vertical-align:      middle;
      box-sizing:          border-box;
      white-space:         nowrap;
    }

    .filter-item {
      position:      relative;
      display:       inline-flex;
      align-items:   center;
      border:        1px solid #d6d6d6;
      border-radius: 3px;
      margin-right:  4px;
      padding:       0 4px;
      height:        20px;
      font-size:     1.1rem;
      cursor:        pointer;
    }

    .filter-item:last-child {
      margin: 0;
    }

    .remove {
      position: relative;
      top:      0;
      right:    0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FilterComponent implements OnDestroy, OnInit {
  destroy$ = new Subject();
  filter$  = new Subject<Filter>();

  field$    = new Subject<Field>();
  operator$ = new Subject<Operator>();
  value$    = new Subject<string | string[]>();

  fields = this.fieldsService.get();

  field: Field;
  operator: Operator;
  value: string | string[];

  @Input() filter: Filter;
  @Input() hideRemove: Boolean = false;
  @Output() onRemove           = new EventEmitter();

  remove () {
    this.onRemove.emit();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.fieldsService.fields
        .takeUntil(this.destroy$)
        .subscribe((fields) => {
          this.fields = fields;
        });

    this.filter$
        .takeUntil(this.destroy$)
        .distinctUntilKeyChanged('field')
        .subscribe((filter) => {
          let newField = this.fields.find((_: Field) => _.id === filter.field) || this.fields[0];
          this.field$.next(<Field>newField);
        });

    this.field$
        .takeUntil(this.destroy$)
        .skip(1)
        .subscribe(({operator}) => {
          this.operator$.next(Object.keys(operator)[0]);
          this.value$.next();
        });

    Observable.combineLatest(this.field$, this.operator$, this.value$)
              .subscribe(([field, operator, value]) => {
                this.field    = field;
                this.operator = operator;
                this.value    = value;

                this.filter.field    = field.id;
                this.filter.operator = operator;
                this.filter.value    = value;
              });

    this.filter$.next(this.filter);
    this.operator$.next(this.filter.operator);
    this.value$.next(this.filter.value);
  }

  constructor (private fieldsService: FieldsService) {}
}
