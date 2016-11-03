import { ActionReducer, Action } from '@ngrx/store';
import { GeoTargetingInfoActions } from './geo-targeting-info.actions';

export type InfoLevel = 'info'|'error';

export interface GeoTargetingInfoState {
  message: string;
  level?: InfoLevel;
  isVisible?: boolean;
  canRevert?: boolean;
}

export const geoTargetingInfoInitial: GeoTargetingInfoState = {
  message:   '',
  level:     'info',
  isVisible: false,
  canRevert: false
};

export const GEO_TARGETING_INFO_KEY = 'geoTargetingInfo';

export const geoTargetingInfoReducer: ActionReducer<GeoTargetingInfoState> = (state = geoTargetingInfoInitial,
                                                                              action: Action) => {
  switch (action.type) {
    case GeoTargetingInfoActions.SHOW_INFO:
      return Object.assign({}, state, action.payload);
    case GeoTargetingInfoActions.HIDE_INFO:
      return Object.assign({}, state, geoTargetingInfoInitial);
    default:
      return state;
  }
};
