import { TargetingSpec } from '../targeting/targeting-spec.interface';
import { ActionReducer, Action } from '@ngrx/store';

export interface AudienceState {
  name: string;
  spec: TargetingSpec;
  budget: number;
  bid: number;
  active: boolean;
  valid: boolean;
}

export const audienceInitial: AudienceState = {
  name:   '',
  spec:   {},
  budget: 0.0,
  bid:    0.0,
  active: true,
  valid:  true
};

export const actionReducer: ActionReducer<AudienceState> = (state = audienceInitial,
                                                            action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
