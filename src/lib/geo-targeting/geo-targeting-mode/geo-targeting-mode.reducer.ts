import { ActionReducer, Action } from '@ngrx/store';
import { GeoTargetingModeActions } from './geo-targeting-mode.actions';

export type GeoTargetingModeIdType = 'include'|'exclude';
export type GeoTargetingModeType = {
  id: GeoTargetingModeIdType,
  name: string;
};

export interface GeoTargetingModeState {
  modes: Array<GeoTargetingModeType>;
  selectedMode: GeoTargetingModeType | null;
  isOpen: boolean;
}

export const geoTargetingModeInitial: GeoTargetingModeState = {
  modes:        [],
  selectedMode: null,
  isOpen:       false
};

export const GEO_TARGETING_MODE_KEY = 'geoTargetingMode';

export const geoTargetingModeReducer: ActionReducer<GeoTargetingModeState> = (state = geoTargetingModeInitial,
                                                                              action: Action) => {
  let modes;
  let selectedMode;

  switch (action.type) {
    case GeoTargetingModeActions.SET_MODE:
      selectedMode = action.payload.selectedMode;

      return Object.assign({}, state, {selectedMode});
    case GeoTargetingModeActions.SET_TRANSLATED_MODES:
      modes = action.payload.modes;

      if (state.selectedMode) {
        selectedMode = modes.find((m) => {
          return m.id === state.selectedMode.id;
        });
      } else {
        selectedMode = modes[0];
      }

      return Object.assign({}, state, {modes, selectedMode});
    case GeoTargetingModeActions.TOGGLE_MODE_DROPDOWN:
      return Object.assign({}, state, {isOpen: action.payload.isOpen});
    default:
      return state;
  }
};
