import { Action, ActionReducer } from '@ngrx/store';
import { SELECT_SEARCH_TYPE } from './geo-targeting-type.actions';
import { GeoTargetingTypeState } from './geo-targeting-type.interface';
import { GeoTargetingTypeInitial } from './geo-targeting-type.initial';

export const geoTargetingTypeReducer: ActionReducer<GeoTargetingTypeState> = (state = GeoTargetingTypeInitial, action: Action) => {
  switch (action.type) {
    case SELECT_SEARCH_TYPE:
      return state;
    default:
      return state;
  }
};
