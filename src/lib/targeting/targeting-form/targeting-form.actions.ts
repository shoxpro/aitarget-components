import { Injectable } from '@angular/core';
import { TargetingFormState } from './targeting-form.reducer';
import { Action } from '@ngrx/store';

@Injectable()
export class TargetingFormActions {
  static SET_FORM_VALUE = '[targeting-form] Set Form Value';

  setFormValue (formValue: TargetingFormState): Action {
    return {
      type:    TargetingFormActions.SET_FORM_VALUE,
      payload: {formValue}
    };
  }
}
