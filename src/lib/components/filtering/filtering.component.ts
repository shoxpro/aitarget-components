import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Field } from './field.interface';
import { Filter } from './filtering.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector:        'fba-filtering',
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: FilteringComponent,
      multi:       true
    }
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

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    console.log(`ngOnInit!`);
  }

  constructor (private changeDetectorRef: ChangeDetectorRef) {}
}
