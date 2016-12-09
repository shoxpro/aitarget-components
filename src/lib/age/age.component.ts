import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormControlToken } from '../shared/constants/form-control-token';
import { SqueezedValueAccessor } from '../shared/interfaces/squeeze-value-accessor.inteface';
import { BehaviorSubject, Subject } from 'rxjs';
import { TargetingSpec } from '../targeting/interfaces/targeting-spec.interface';
import { ageInitial } from '../targeting/interfaces/targeting-spec-age.interface';

const range = require('lodash/range');

@Component({
  selector:        'fba-age',
  templateUrl:     './age.html',
  styleUrls:       ['./age.scss'],
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: AgeComponent,
      multi:       true
    },
    {provide: FormControlToken, useExisting: AgeComponent},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgeComponent implements ControlValueAccessor, SqueezedValueAccessor, OnInit, OnDestroy {
  destroy$       = new Subject();
  squeezedValue$ = new BehaviorSubject(this.getAgeString(ageInitial));

  ages = range(13, 66);

  // ==== value ====
  _value: TargetingSpec = ageInitial;

  set value (value: any) {
    this._value = value || this._value;

    this.propagateChange(this._value);
    this.updateSqueezedValue();
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
  propagateChange (_: TargetingSpec) { return _; }

  // ==== implement ControlValueAccessor ====
  writeValue (value: TargetingSpec) {
    this._value = value || this._value;
    this.updateSqueezedValue();
  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () {}

  // ==== implement ControlValueAccessor ====

  // ==== implement SqueezedValueAccessor ====

  updateSqueezedValue () {
    this.squeezedValue$.next(this.getAgeString());
  }

  getSqueezedValue () {
    return this.squeezedValue$.getValue();
  }

  focus () {
  }

  // ==== implement SqueezedValueAccessor ====

  getAgeString (value = this._value) {
    const plusSign = value.age_max === 65 ? '+' : '';
    return `${value.age_min} - ${value.age_max}${plusSign}`;
  }

  selectAge (name, value) {
    const updatedValue = Object.assign({}, this.value, {[name]: Number(value)});

    if (updatedValue.age_min > updatedValue.age_max) {
      updatedValue.age_min = updatedValue.age_max;
    }

    this.value = updatedValue;
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {}

  constructor () {}
}
