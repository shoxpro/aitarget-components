import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Field } from './field.interface';
import { Filter } from './filtering.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { FieldsService } from './fields.service';
import { FilteringService } from './filtering.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteringComponent implements ControlValueAccessor, OnInit, OnDestroy {
  destroy$   = new Subject();
  filtering$ = new BehaviorSubject([]);

  @Input() fields: Array<Field>;

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
      operator: this.fields[0].operator[0]
    });

    this.filteringService.set(this.value);
  }

  removeFilter (index) {
    this.value.splice(index, 1);

    this.filteringService.set(this.value);
  }

  changeFilter (filter, index) {
    this.value[index] = filter;

    this.filteringService.set(this.value);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.fieldsService.set(this.fields);

    this.filteringService.filters.takeUntil(this.destroy$)
        .subscribe((filters: Filter[]) => {
          this.value = filters;

          console.log(`this.value: `, this.value);

          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
  }

  constructor (private changeDetectorRef: ChangeDetectorRef,
               private fieldsService: FieldsService,
               private filteringService: FilteringService) {}
}
