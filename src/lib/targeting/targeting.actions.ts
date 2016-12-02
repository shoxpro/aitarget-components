import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { TargetingForm } from './targeting-form/targeting-form.interface';

@Injectable()
export class TargetingActions {
  static SPLIT_FORM_VALUE = '[targeting] Split Form Value';
  static UPDATE_AUDIENCE  = '[targeting] Update Audience';

  splitFormValue (formValue: TargetingForm): Action {
    return {
      type:    TargetingActions.SPLIT_FORM_VALUE,
      payload: {formValue}
    };
  }

  updateAudience (index, audience) {
    return {
      type:    TargetingActions.UPDATE_AUDIENCE,
      payload: {index, audience}
    };
  }
}
