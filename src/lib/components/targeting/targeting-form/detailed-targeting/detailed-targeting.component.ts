import {
  Component, ChangeDetectionStrategy, OnDestroy, Input, ChangeDetectorRef, OnInit, ViewChildren
} from '@angular/core';
import { SqueezedValueAccessor } from '../../../../shared/interfaces/squeeze-value-accessor.inteface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormControlToken } from '../../../../shared/constants/form-control-token';
import { detailedTargetingSpecInitial } from '../../interfaces/targeting-spec-detailed.interface';

const isEqual = require('lodash/isEqual');

@Component({
  selector:        'fba-detailed-targeting',
  templateUrl:     './detailed-targeting.html',
  styleUrls:       ['./detailed-targeting.scss'],
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: DetailedTargetingComponent,
      multi:       true
    },
    {provide: FormControlToken, useExisting: DetailedTargetingComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingComponent implements ControlValueAccessor, SqueezedValueAccessor, OnInit, OnDestroy {
  destroy$       = new Subject();
  squeezedValue$ = new BehaviorSubject('–');

  @Input() adaccountId = 'act_944874195534529';
  @ViewChildren(FormControlToken) detailedComponents;

  detailedTargetingForm: FormGroup;

  // ==== value ====
  _value: TargetingSpec = {};

  set value (value: any) {
    this._value = value || this._value;

    this.updateSqueezedValue();
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
  propagateChange (_: TargetingSpec) { return _; }

  // ==== implement ControlValueAccessor ====
  writeValue (value: TargetingSpec) {
    if (!value) {
      return;
    }

    this._value = value || this._value;
    this.updateForm();
  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () {}

  // ==== implement ControlValueAccessor ====

  // ==== implement SqueezedValueAccessor ====

  updateSqueezedValue () {
    let squeezedValue = this.detailedComponents.reduce((acc, control, index) => {
      let prefix = '<b>People Who Match: </b>';
      if (index > 0) {
        prefix = control.type === 'flexible_spec' ? '<b>And Must Also Match: </b>' : '<b>Exclude: </b>';
      }

      return acc + prefix + control.getSqueezedValue() + '<br>';
    }, '');
    this.squeezedValue$.next(squeezedValue || '–');
  }

  getSqueezedValue () {
    return this.squeezedValue$.getValue();
  }

  focus () {
  }

  // ==== implement SqueezedValueAccessor ====

  updateForm (formValue = this.value) {
    if (isEqual(formValue, this.detailedTargetingForm.value)) {
      return;
    }

    this.detailedTargetingForm = this.getForm(formValue);
    this.watchFormValueChanges();

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Set model driven form using passed form value or initial form value
   * @param formValue
   */
  getForm (formValue = detailedTargetingSpecInitial) {
    let groupData = {};

    /**
     * Iterate through initial detailedTargeting keys
     */
    for (let name in detailedTargetingSpecInitial) {
      if (detailedTargetingSpecInitial.hasOwnProperty(name)) {
        if (Array.isArray(formValue[name])) {
          groupData[name] = this.formBuilder.array(
            formValue[name].map((data) => this.formBuilder.control(data))
          );
        } else if (formValue[name] !== null) { // ignore null value
          groupData[name] = this.formBuilder.control(formValue[name]);
        }
      }
    }

    return this.formBuilder.group(groupData);
  }

  /**
   * Narrow audience by adding another control
   */
  addControl (name: string) {
    if (this.detailedTargetingForm.controls[name] instanceof FormArray) {
      const control = <FormArray>this.detailedTargetingForm.controls[name];
      control.push(this.formBuilder.control({}));
    } else {
      this.detailedTargetingForm.addControl(name, this.formBuilder.control({}));
    }
  }

  /**
   * Remove control from by index
   * @param name
   * @param i
   */
  removeControl ({name, i}: {name: string, i: number}) {
    if (this.detailedTargetingForm.controls[name] instanceof FormArray) {
      const control = <FormArray>this.detailedTargetingForm.controls[name];
      control.removeAt(i);
    } else {
      this.detailedTargetingForm.removeControl(name);
    }
  }

  /**
   * Subscribe to form value changes and update component's value when it is changed
   */
  watchFormValueChanges () {
    this.detailedTargetingForm.valueChanges
        .takeUntil(this.destroy$)
        .subscribe((formValue) => {
          this.value = formValue;
        });
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedTargetingForm = this.getForm();
    this.watchFormValueChanges();
  }

  constructor (private formBuilder: FormBuilder,
               private changeDetectorRef: ChangeDetectorRef) {}
}
