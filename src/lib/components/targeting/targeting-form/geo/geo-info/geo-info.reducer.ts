import { ActionReducer, Action } from '@ngrx/store';
import { GeoInfoActions } from './geo-info.actions';

export type InfoLevel = 'info'|'error';

export interface GeoInfoState {
  message: string;
  level?: InfoLevel;
  isVisible?: boolean;
  canRevert?: boolean;
  revertKeys?: Array<string>;
}

export const geoInfoInitial: GeoInfoState = {
  message:   '',
  level:     'info',
  isVisible: false,
  canRevert: false
};

export const GEO_TARGETING_INFO_KEY = 'geoInfo';

export const geoInfoReducer: ActionReducer<GeoInfoState> = (state = geoInfoInitial,
                                                            action: Action) => {
  switch (action.type) {
    case GeoInfoActions.SHOW_INFO:
      return Object.assign({}, state, action.payload.info);
    case GeoInfoActions.HIDE_INFO:
      return Object.assign({}, state, geoInfoInitial);
    default:
      return state;
  }
};
