import { ActionReducer, Action } from '@ngrx/store';
import { GeoTargetingModeActions } from './geo-targeting-mode.actions';

export type GeoTargetingModeType = 'include'|'exclude';

export interface GeoTargetingModeState {
  mode: GeoTargetingModeType;
  isOpen: boolean;
}

export const geoTargetingModeInitial: GeoTargetingModeState = {
  mode:   'include',
  isOpen: false
};

export const GEO_TARGETING_MODE_KEY = 'geoTargetingMode';

export const geoTargetingModeReducer: ActionReducer<GeoTargetingModeState> = (state = geoTargetingModeInitial,
                                                                              action: Action) => {
  switch (action.type) {
    case GeoTargetingModeActions.SET_MODE:
      return Object.assign({}, state, {mode: action.payload.mode});
    case GeoTargetingModeActions.TOGGLE_MODE_DROPDOWN:
      return Object.assign({}, state, {isOpen: action.payload.isOpen});
    default:
      return state;
  }
};
