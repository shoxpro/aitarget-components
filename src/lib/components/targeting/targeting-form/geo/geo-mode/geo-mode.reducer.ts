import { ActionReducer, Action } from '@ngrx/store';
import { GeoModeActions } from './geo-mode.actions';

export type GeoModeIdType = 'include'|'exclude'|'delete';
export type GeoModeType = {
  id: GeoModeIdType,
  name: string;
};

export interface GeoModeState {
  modes: Array<GeoModeType>;
  selectedMode: GeoModeType | null;
  isOpen: boolean;
}

export const geoModeInitial: GeoModeState = {
  modes:        [],
  selectedMode: null,
  isOpen:       false
};

export const GEO_TARGETING_MODE_KEY = 'geoMode';

export const geoModeReducer: ActionReducer<GeoModeState> = (state = geoModeInitial,
                                                            action: Action) => {
  let modes;
  let selectedMode;

  switch (action.type) {
    case GeoModeActions.SET_MODE:
      selectedMode = action.payload.selectedMode;

      return Object.assign({}, state, {selectedMode});
    case GeoModeActions.SET_TRANSLATED_MODES:
      modes = action.payload.modes;

      if (state.selectedMode) {
        selectedMode = modes.find((m) => {
          return m.id === state.selectedMode.id;
        });
      } else {
        selectedMode = modes[0];
      }

      return Object.assign({}, state, {modes, selectedMode});
    case GeoModeActions.TOGGLE_MODE_DROPDOWN:
      return Object.assign({}, state, {isOpen: action.payload.isOpen});
    default:
      return state;
  }
};
