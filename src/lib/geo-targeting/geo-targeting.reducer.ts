import { combineReducers, ActionReducer } from '@ngrx/store';
import { GeoTargetingTypeState, geoTargetingTypeReducer } from './geo-targeting-type/geo-targeting-type.reducer';
import {
  GeoTargetingSearchState, geoTargetingSearchReducer
} from './geo-targeting-search/geo-taregting-search.reducer';
import { GeoTargetingModeState, geoTargetingModeReducer } from './geo-targeting-mode/geo-targeting-mode.reducer';
import {
  GeoTargetingSelectedState, geoTargetingSelectedReducer
} from './geo-targeting-selected/geo-targeting-selected.reducer';
import {
  GeoTargetingLocationTypeState, geoTargetingLocationTypeReducer
} from './geo-targeting-location-type/geo-targeting-location-type.reducer';
import { GeoTargetingInfoState, geoTargetingInfoReducer } from './geo-targeting-info/geo-targeting-info.reducer';
import { compose } from '@ngrx/core/compose';
import { GeoTargetingActions } from './geo-targeting.actions';

export interface GeoTargetingState {
  geoTargetingSearch: GeoTargetingSearchState;
  geoTargetingSelected: GeoTargetingSelectedState;
  geoTargetingType: GeoTargetingTypeState;
  geoTargetingMode: GeoTargetingModeState;
  geoTargetingLocationType: GeoTargetingLocationTypeState;
  geoTargetingInfo: GeoTargetingInfoState;
}

export const GEO_TARGETING_STATE_KEY = 'geoTargeting';

function multiplyReducer (reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state = {}, action) {
    if (action.type.includes('geo-targeting')) {
      let id = action.payload.id;

      if (action.type === GeoTargetingActions.GEO_TARGETING_DESTROY) {
        return Object.assign({}, state, {[id]: null});
      }

      let geoTargeting: Array<GeoTargetingState> = Object.assign({}, state[id]);

      return Object.assign({}, state, {[id]: reducer(geoTargeting, action)});
    } else {
      return state;
    }
  };
}

export const geoTargetingReducer = compose(multiplyReducer)(combineReducers({
  geoTargetingSearch:       geoTargetingSearchReducer,
  geoTargetingSelected:     geoTargetingSelectedReducer,
  geoTargetingType:         geoTargetingTypeReducer,
  geoTargetingMode:         geoTargetingModeReducer,
  geoTargetingLocationType: geoTargetingLocationTypeReducer,
  geoTargetingInfo:         geoTargetingInfoReducer
}));
