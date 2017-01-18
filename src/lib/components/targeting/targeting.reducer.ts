import { AudienceState, audienceInitial } from './audience/audience.interface';
import { ActionReducer, combineReducers } from '@ngrx/store';
import {
  TargetingFormState, targetingFormInitial, targetingFormReducer
} from './targeting-form/targeting-form.reducer';
import { targetingAudiencesReducer } from './targeting-audiences/targeting-audiences.reducer';
import { AudienceIndexesState, audienceIndexesReducer, audienceIndexesInitial } from './audience/audience.reducer';

export interface TargetingState {
  audiences: Array<AudienceState>;
  formValue: TargetingFormState;
  audienceIndexes: AudienceIndexesState;
}

export const targetingInitial: TargetingState = {
  audiences:       [audienceInitial],
  formValue:       targetingFormInitial,
  audienceIndexes: audienceIndexesInitial
};

export const TARGETING_KEY = 'targeting';

export const targetingReducer: ActionReducer<TargetingState> = combineReducers({
  audiences:       targetingAudiencesReducer,
  formValue:       targetingFormReducer,
  audienceIndexes: audienceIndexesReducer
});
