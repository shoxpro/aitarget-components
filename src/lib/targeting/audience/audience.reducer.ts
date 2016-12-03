import { TargetingSpec } from '../interfaces/targeting-spec.interface';
import { ActionReducer, Action } from '@ngrx/store';

export interface AudienceState {
  name: string;
  spec: TargetingSpec;
  formValue: any;
  budget: number;
  bid: number;
  active: boolean;
  valid: boolean;
}

export const audienceInitial: AudienceState = {
  name:      '',
  spec:      {},
  formValue: {},
  budget:    0.0,
  bid:       0.0,
  active:    true,
  valid:     true
};

// noinspection JSUnusedGlobalSymbols
export const actionReducer: ActionReducer<AudienceState> = (state = audienceInitial,
                                                            action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
