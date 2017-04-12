import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Filter } from './filtering.interface';
import { FieldsService } from './fields.service';
import { Field } from './field.interface';
import { Operator } from './operator.interface';

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
                     <fba-filter-value class="filter-item"></fba-filter-value>
                     <fba-close class="remove"
                                (onClose)="remove()"></fba-close>
                   `,
  styles:          [`
    :host {
      display:             inline-flex;
      align-items:         center;
      height:              30px;
      background:          #e9ebee;
      border:              solid 1px #dddfe2;
      border-radius:       4px;
      box-shadow:          0 0 1px rgba(0, 0, 0, .6);
      margin:              4px;
      max-width:           100%;
      padding:             2px 4px;
      -webkit-user-select: none;
      vertical-align:      middle;
      box-sizing:          border-box;
      white-space:         nowrap;
    }

    .filter-item {
      display:      inline-flex;
      align-items:  center;
      border:       1px solid #cccccc;
      margin-right: 4px;
      padding:      0 4px;
      height:       20px;
      font-size:    1.1rem;
      cursor:       pointer;
    }

    .remove {
      position: relative;
      top:      0;
      right:    0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnDestroy, OnInit {
  destroy$ = new Subject();
  filter$  = new Subject<Filter>();

  field$    = new Subject<Field>();
  operator$ = new Subject<Operator>();
  value$    = new Subject();

  fields = this.fieldsService.get();

  field;
  operator;

  @Input() filter: Filter;
  @Output() onRemove = new EventEmitter();

  remove () {
    this.onRemove.emit();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.filter$
        .takeUntil(this.destroy$)
        .distinctUntilKeyChanged('field')
        .subscribe((filter) => {
          let newField = this.fields.find((_) => _.id === filter.field) || this.fields[0];
          this.field$.next(newField);
        });

    this.field$
        .takeUntil(this.destroy$)
        .subscribe(({operator}) => {
          let newOperator = operator.find((_) => _.id === this.filter.field) || operator[0];
          this.operator$.next(newOperator);
        });

    Observable.combineLatest(this.field$, this.operator$)
              .subscribe(([field, operator]) => {
                this.field    = field;
                this.operator = operator;

                this.filter.field    = field.id;
                this.filter.operator = operator.id;
              });

    this.filter$.next(this.filter);
  }

  constructor (private fieldsService: FieldsService) {}
}
