import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output
} from '@angular/core';
import { Field, Filter } from './filtering.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { FieldsService } from './fields.service';
import { FilteringService } from './filtering.service';
import { DEFAULT_FILTERING } from './filtering.constants';

@Component({
  selector:        'fba-filtering',
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: FilteringComponent,
      multi:       true
    },
    FilteringService,
    FieldsService
  ],
  templateUrl:     'filtering.component.html',
  styleUrls:       ['filtering.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FilteringComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  destroy$   = new Subject();
  filtering$ = new BehaviorSubject([]);

  @Input() fields: Array<Field>;
  @Input() filtering: Array<Filter>;
  @Output() onApply = new EventEmitter();

  // ==== value ====
  _value: Array<Filter> = [];

  set value (value: any) {
    this._value = value || this._value;

    this.propagateChange(this._value);
  }

  get value () {
    return this._value;
  }

  // ==== value ====

  // noinspection JSMethodCanBeStatic
  /**
   * Will be replaced when implementing registerOnChange
   * @param _ {TargetingSpec}
   */
  propagateChange (_: Array<Filter>) { return _; }

  // ==== implement ControlValueAccessor ====
  writeValue (value: Array<Filter>) {
    this._value = value || this._value;
    this.updateView();
  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () { return; }

  // ==== implement ControlValueAccessor ====

  updateView () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  addFilter () {
    this.value.push({
      field:    this.fields[0].id,
      operator: Object.keys(this.fields[0].operator)[0]
    });

    this.filteringService.set(this.value);
  }

  removeFilter (index) {
    this.value.splice(index, 1);

    this.filteringService.set(this.value);
  }

  apply () {
    // Filter out filers without values
    let filtering = this.filteringService.get()
                        .filter((filter) => Boolean(filter.value));
    this.onApply.emit(filtering);
  }

  clear () {
    let fields        = this.fieldsService.get();
    let statusField   = fields.find((field) => field.id.indexOf('.effective_status') > -1);
    let defaultFilter = [].concat(DEFAULT_FILTERING)[0];

    defaultFilter.field = statusField.id;

    this.filteringService.set([defaultFilter]);
  }

  ngOnChanges (changes) {
    if (changes.filtering) {
      this.filteringService.set(changes.filtering.currentValue);
    }

    if (changes.fields) {
      this.fieldsService.set(changes.fields.currentValue);
    }
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.filteringService.filters
        .takeUntil(this.destroy$)
        .subscribe((filters: Filter[]) => {
          this.value = filters;
        });

    this.fieldsService.set(this.fields);
    this.filteringService.set(this.filtering);
  }

  constructor (private changeDetectorRef: ChangeDetectorRef,
               private fieldsService: FieldsService,
               private filteringService: FilteringService) {}
}
