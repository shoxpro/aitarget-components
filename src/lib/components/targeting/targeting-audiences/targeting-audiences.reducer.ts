import { AudienceState, audienceInitial } from '../audience/audience.interface';
import { ActionReducer, Action } from '@ngrx/store';
import { TargetingAudiencesActions } from './targeting-audiences.actions';

export const targetingAudiencesInitial: Array<AudienceState> = [audienceInitial];

export const TARGETING_AUDIENCES_KEY = 'audiences';

export const targetingAudiencesReducer: ActionReducer<Array<AudienceState>> = (state = targetingAudiencesInitial,
                                                                               action: Action) => {
  switch (action.type) {
    case TargetingAudiencesActions.SET_AUDIENCES:
      return action.payload.audiences.slice();
    case TargetingAudiencesActions.UPDATE_AUDIENCE:
      return state.map((audience, index) => {
        if (index === action.payload.index) {
          return Object.assign({}, audience, action.payload.audience);
        }
        return audience;
      });
    // state[action.payload.index] = Object.assign({}, state[action.payload.index], action.payload.audience);
    // return state;
    default:
      return state;
  }
};
