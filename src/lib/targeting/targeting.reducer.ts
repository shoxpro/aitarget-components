import { AudienceState, audienceInitial } from './audience/audience.interface';
import { ActionReducer, combineReducers } from '@ngrx/store';
import {
  TargetingFormState, targetingFormInitial, targetingFormReducer
} from './targeting-form/targeting-form.reducer';
import { TargetingActions } from './targeting.actions';
import { targetingAudiencesReducer } from './targeting-audiences/targeting-audiences.reducer';

export interface TargetingState {
  audiences: Array<AudienceState>;
  formValue: TargetingFormState;
  audienceEditIndex: number | null;
}

export const targetingInitial: TargetingState = {
  audiences:         [audienceInitial],
  formValue:         targetingFormInitial,
  audienceEditIndex: null
};

export const TARGETING_KEY = 'targeting';

export const targetingReducer: ActionReducer<TargetingState> = combineReducers({
  audiences: targetingAudiencesReducer,
  formValue: targetingFormReducer,
  audienceEditIndex (state = null, action) {
    switch (action.type) {
      case TargetingActions.SET_EDIT_AUDIENCE_INDEX:
        return action.payload.index;
      default:
        return state;
    }
  }
});
