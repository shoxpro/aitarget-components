import { ActionReducer, Action } from '@ngrx/store';
import { GeoTargetingModeActions } from './geo-targeting-mode.actions';

export type GeoTargetingModeType = 'include'|'exclude';
export interface GeoTargetingModeState {
  mode: GeoTargetingModeType;
}

export const geoTargetingModeInitial: GeoTargetingModeState = {
  mode: 'include'
};

export const geoTargetingModeReducer: ActionReducer<GeoTargetingModeState> = (state = geoTargetingModeInitial,
                                                                              action: Action) => {
  switch (action.type) {
    case GeoTargetingModeActions.SET_MODE:
      return Object.assign({}, state, {mode: action.payload.mode});
    default:
      return state;
  }
};
