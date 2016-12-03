import { AudienceState, audienceInitial } from './audience/audience.reducer';
import { ActionReducer, Action } from '@ngrx/store';
import { TargetingForm, targetingFormInitial } from './targeting-form/targeting-form.interface';
import { TargetingActions } from './targeting.actions';
import { splitFormValue, getSpecFromFormValue } from './targeting.constants';

export interface TargetingState {
  audiences: Array<AudienceState>;
  formValue: TargetingForm;
}

export const targetingInitial: TargetingState = {
  audiences: [audienceInitial],
  formValue: targetingFormInitial
};

export const TARGETING_KEY = 'targeting';

export const targetingReducer: ActionReducer<TargetingState> = (state = targetingInitial,
                                                                action: Action) => {
  switch (action.type) {
    case TargetingActions.SPLIT_FORM_VALUE:
      const audiences = splitFormValue(action.payload.formValue)
        .map((formValue) => {
          let spec = getSpecFromFormValue(formValue);
          return Object.assign({}, audienceInitial, {formValue, spec});
        });
      const formValue = action.payload.formValue;
      return {audiences, formValue};
    default:
      return state;
  }
};
