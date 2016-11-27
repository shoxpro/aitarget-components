import { AudienceState, audienceInitial } from '../audience/audience.reducer';
import { TargetingSpec, targetingSpecInitial } from './targeting-spec.interface';
import { ActionReducer, Action } from '@ngrx/store';

export interface TargetingState {
  audiences: Array<AudienceState>;
  form: Array<TargetingSpec>;
}

export const targetingInitial: TargetingState = {
  audiences: [audienceInitial],
  form:      [targetingSpecInitial]
};

export const TARGETING_KEY = 'targeting';

export const targetingReducer: ActionReducer<TargetingState> = (state = targetingInitial,
                                                                action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
