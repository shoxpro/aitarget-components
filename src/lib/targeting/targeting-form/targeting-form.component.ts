import {
  Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, OnDestroy, Input, OnChanges
} from '@angular/core';
import { targetingSpecInitial } from '../interfaces/targeting-spec.interface';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { targetingFormInitial } from './targeting-form.interface';
import isEqual = require('lodash/isEqual');

@Component({
  selector:        'fba-targeting-form',
  templateUrl:     './targeting-form.html',
  styleUrls:       ['./targeting-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingFormComponent implements OnInit, OnDestroy, OnChanges {
  destroy$ = new Subject();

  @Input() formValue;

  @Output() changeSpec = new EventEmitter();
  @Output() onChange   = new EventEmitter();

  // TODO: accountId should be set from AppState
  adaccountId = 'act_944874195534529';

  targetingForm: FormGroup;

  /**
   * Set model driven form using passed form value or initial form value
   * @param formValue
   */
  setForm (formValue = {}) {
    let groupData = {};

    formValue = Object.assign({}, targetingFormInitial, formValue);

    for (let name in formValue) {
      if (formValue.hasOwnProperty(name)) {
        groupData[name] = this.formBuilder.array(
          formValue[name].map((data) => this.formBuilder.control(data))
        );
      }
    }

    this.targetingForm = this.formBuilder.group(groupData);
  }

  /**
   * Add another control by name
   */
  addControl (name: string) {
    const control = <FormArray>this.targetingForm.controls[name];
    control.push(this.formBuilder.control(targetingSpecInitial));
  }

  /**
   * Remove control bu name and index
   * @param name
   * @param i
   */
  removeControl ({name, i}: {name: string, i: number}) {
    const control = <FormArray>this.targetingForm.controls[name];
    control.removeAt(i);
  }

  // noinspection JSUnusedGlobalSymbols
  ngOnChanges (changes) {
    if (changes.formValue.currentValue && !isEqual(changes.formValue.currentValue, this.targetingForm.getRawValue())) {
      this.setForm(changes.formValue.currentValue);
    }
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.targetingForm
        .valueChanges
        .takeUntil(this.destroy$)
        .subscribe((formValue) => {
          console.log(`new formValue: `, formValue);
          this.changeSpec.emit(formValue);
          this.onChange.emit(formValue);
        });
  }

  constructor (private formBuilder: FormBuilder) {
    this.setForm();
  }
}
