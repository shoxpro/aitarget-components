import {
  Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { targetingSpecInitial } from '../interfaces/targeting-spec.interface';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { targetingFormInitial } from './targeting-form.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/index';
import { TargetingService } from '../targeting.service';
import { Subject } from 'rxjs';
import { getSpecFromFormValue } from '../targeting.constants';
import { TargetingFormService } from './targeting-form.service';
import { TargetingAudiencesService } from '../targeting-audiences/targeting-audiences.service';
import { AudienceState } from '../audience/audience.interface';

const isEqual = require('lodash/isEqual');

@Component({
  selector:        'fba-targeting-form',
  templateUrl:     './targeting-form.html',
  styleUrls:       ['./targeting-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  targeting$;
  audienceEditIndex$;
  formValue$;
  audienceEdited$;

  @Output() onChange = new EventEmitter();

  editMode = false;

  _formLegendDefault = 'FORM FOR SPLITTING';
  _submitTextDefault = 'SPLIT';

  formLegend = this._formLegendDefault;
  submitText = this._submitTextDefault;

  // TODO: accountId should be set from AppState
  adaccountId = 'act_944874195534529';

  targetingForm: FormGroup = this.setForm();

  /**
   * Set model driven form using passed form value or initial form value
   * @param formValue
   */
  setForm (formValue = {}) {
    let groupData = {};
    formValue     = Object.assign({}, targetingFormInitial, formValue);

    for (let name in formValue) {
      if (formValue.hasOwnProperty(name)) {
        groupData[name] = this.formBuilder.array(
          formValue[name].map((data) => this.formBuilder.control(data))
        );
      }
    }

    return this.formBuilder.group(groupData);
  }

  updateForm (formValue) {
    if (isEqual(formValue, this.targetingForm.value)) {
      return;
    }
    this.targetingForm = this.setForm(formValue);
    this.changeDetectorRef.markForCheck();
  }

  /**
   * When submitted
   */
  onSubmit () {
    if (this.editMode) {
      /**
       * Update audience
       */
      this.audienceEdited$
          .take(1)
          .subscribe(({index, audience}) => {
            const formValue      = this.targetingForm.value;
            const spec           = getSpecFromFormValue(formValue);
            const audienceEdited = Object.assign({}, audience, {formValue, spec});

            this.targetingAudiencesService.extendAudience(audienceEdited)
                .subscribe((extendedAudience) => {
                  this.targetingAudiencesService.updateAudience(index, extendedAudience);
                });

          });

      /**
       * Restore splitting form
       */
      this.formValue$
          .take(1)
          .subscribe((formValue) => {
            this.updateForm(formValue);
            this.targetingService.setEditAudienceIndex(null);
          });

    } else {
      this.onChange.emit(this.targetingForm.value);
    }
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

  processAudienceEditIndex (index, audience?: AudienceState) {
    const editMode  = audience && index !== null;
    this.editMode   = editMode;
    this.submitText = editMode ? 'SAVE' : this._submitTextDefault;
    this.formLegend = editMode ? `EDIT AUDIENCE: "${audience.name}"` : this._formLegendDefault;
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.audienceEditIndex$
        .subscribe((index) => this.processAudienceEditIndex(index));

    this.audienceEdited$
        .subscribe(({index, audience}) => this.processAudienceEditIndex(index, audience));

    /**
     * Update form for new formValue
     */
    this.audienceEdited$
        .map(({audience}) => audience.formValue)
        .merge(this.formValue$)
        .subscribe((formValue) => this.updateForm(formValue));
  }

  constructor (private _store: Store<AppState>,
               private changeDetectorRef: ChangeDetectorRef,
               private targetingAudiencesService: TargetingAudiencesService,
               private targetingService: TargetingService,
               private formBuilder: FormBuilder) {
    this.targeting$ = this._store.let(TargetingService.getModel);

    this.audienceEditIndex$ = this.targeting$
                                  .takeUntil(this.destroy$)
                                  .skip(2)
                                  .map(({audienceEditIndex}) => audienceEditIndex)
                                  .distinctUntilChanged();

    this.audienceEdited$ = this.targeting$
                               .takeUntil(this.destroy$)
                               .filter(({audienceEditIndex}) => audienceEditIndex !== null)
                               .map(({audienceEditIndex, audiences}) => {
                                 return {
                                   index:    audienceEditIndex,
                                   audience: audiences[audienceEditIndex]
                                 };
                               });

    this.formValue$ = this._store.let(TargetingFormService.getModel)
                          .takeUntil(this.destroy$);
  }
}
