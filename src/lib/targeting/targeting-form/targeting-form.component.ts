import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { targetingSpecInitial } from '../targeting-spec.interface';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-targeting-form',
  templateUrl:     './targeting-form.html',
  styleUrls:       ['./targeting-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingFormComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  @Output() changeSpec = new EventEmitter();

  spec = targetingSpecInitial;

  targetingForm: FormGroup;

  /**
   * Add another control by name
   */
  addControl (name: string) {
    const control = <FormArray>this.targetingForm.controls[name];
    control.push(this.formBuilder.control(this.spec));
  }

  /**
   * Remove control bu name and index
   * @param name
   * @param i
   */
  removeControl (name: string, i: number) {
    const control = <FormArray>this.targetingForm.controls[name];
    control.removeAt(i);
  }

  constructor (private formBuilder: FormBuilder) {}

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.targetingForm = this.formBuilder.group({
      'geoTargetings': this.formBuilder.array([
        this.formBuilder.control(this.spec)
      ])
    });

    this.targetingForm
        .valueChanges
        .takeUntil(this.destroy$)
        .subscribe((formValue) => {
          console.log(`formValue: `, formValue);
          this.changeSpec.emit(formValue);
        });
  }
}
