import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SqueezedValueAccessor } from '../../../../shared/interfaces/squeeze-value-accessor.inteface';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';
import { Subject, BehaviorSubject } from 'rxjs';
import { FormControlToken } from '../../../../shared/constants/form-control-token';

@Component({
  selector:        'fba-gender',
  templateUrl:     'gender.html',
  styleUrls:       ['gender.scss'],
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: GenderComponent,
      multi:       true
    },
    {provide: FormControlToken, useExisting: GenderComponent},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderComponent implements ControlValueAccessor, SqueezedValueAccessor, OnInit, OnDestroy {
  _allGenders = {id: 0, name: 'All'};

  destroy$       = new Subject();
  squeezedValue$ = new BehaviorSubject(this._allGenders.name);

  genders = [
    this._allGenders,
    {id: 1, name: 'Men'},
    {id: 2, name: 'Women'}
  ];

  selectedGender = this._allGenders;

  // ==== value ====
  _value: TargetingSpec = {};

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

    if (this._value.genders) {
      this.selectedGender = this.genders.find((gender) => gender.id === Number(this._value.genders[0]));
    } else {
      this.selectedGender = this._allGenders;
    }

    this.updateSqueezedValue();
  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () {}

  // ==== implement ControlValueAccessor ====

  // ==== implement SqueezedValueAccessor ====

  updateSqueezedValue () {
    this.squeezedValue$.next(this.selectedGender.name);
  }

  getSqueezedValue () {
    return this.squeezedValue$.getValue();
  }

  focus () {
  }

  // ==== implement SqueezedValueAccessor ====

  selectGender (gender) {
    this.selectedGender = gender;

    if (!gender.id) {
      this.value = {};
    } else {
      this.value = {
        genders: [Number(gender.id)]
      };
    }
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {}

  constructor () {}
}
