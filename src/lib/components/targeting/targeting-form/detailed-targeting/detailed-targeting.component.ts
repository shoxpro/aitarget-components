import {
  Component, ChangeDetectionStrategy, OnDestroy, Input, ChangeDetectorRef, OnInit, ViewChildren
} from '@angular/core';
import { SqueezedValueAccessor } from '../../../../shared/interfaces/squeeze-value-accessor.inteface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControlToken } from '../../../../shared/constants/form-control-token';
import { detailedTargetingSpecInitial, detailedSpecInitial } from '../../interfaces/targeting-spec-detailed.interface';
import isEqual from 'lodash-es/isEqual';
import isEmpty from 'lodash-es/isEmpty';

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

  registerOnTouched () { return; }

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

  focus () { return; }

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

    /*Extend with initial values*/
    formValue = Object.assign({}, detailedTargetingSpecInitial, formValue);

    /*
     * Set or extend flexible specs from detailed targeting keys from upper level
     * e.g. interests, behaviors, etc. That's how we support old format targetings
     * (before flexible specs become available).
     * Important! Targeting segments e.g. interests/behaviors specified inside flexible_spec
     * are not available for use outside of flexible_spec.
     * */
    let generatedFlexibleSpecs = [];
    for (let name in detailedSpecInitial) {
      if (detailedSpecInitial.hasOwnProperty(name) && formValue[name]) {
        // Add to flexible spec
        generatedFlexibleSpecs.push({[name]: formValue[name]});
      }
    }

    /**
     * If no true flexible specs, but has generated flexible spec, update!
     */
    formValue['flexible_spec'] = formValue['flexible_spec']
      .filter((flexibleSpec) => !generatedFlexibleSpecs.length || !isEmpty(flexibleSpec))
      .concat(generatedFlexibleSpecs);

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
  removeControl ({name, i}: {name: string, i?: number}) {
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
          let newValue = Object.assign({}, {flexible_spec: null, exclusions: null}, formValue);

          // Filter out empty flexible specs
          if (Array.isArray(newValue['flexible_spec'])) {
            newValue['flexible_spec'] = newValue['flexible_spec'].filter((flexibleSpec, i) => {
              const isEmptySpec = isEmpty(flexibleSpec);

              /*Remove control if current spec is empty, it is not the first and the only one spec
               * and previously had a value*/
              if (isEmptySpec &&
                this.value['flexible_spec'] && !isEmpty(this.value['flexible_spec'][i]) &&
                newValue['flexible_spec'].length > 1) {
                this.removeControl({name: 'flexible_spec', i});
              }

              // Ignore first flexible_spec
              return !isEmptySpec;
            });
          }

          // Filter out empty exclusions
          if (newValue['exclusions'] !== null && isEmpty(newValue['exclusions'])) {
            newValue['exclusions'] = null;
            // Remove exclusions if previously it had values
            if (!isEmpty(this.value['exclusions'])) {
              this.removeControl({name: 'exclusions'});
            }
          }

          this.value = newValue;

          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
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
