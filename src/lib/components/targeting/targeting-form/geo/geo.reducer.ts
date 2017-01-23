import { combineReducers, ActionReducer } from '@ngrx/store';
import { GeoTypeState, geoTypeReducer } from './geo-type/geo-type.reducer';
import { GeoSearchState, geoSearchReducer } from './geo-search/geo-taregting-search.reducer';
import { GeoModeState, geoModeReducer } from './geo-mode/geo-mode.reducer';
import { GeoSelectedState, geoSelectedReducer } from './geo-selected/geo-selected.reducer';
import { GeoLocationTypeState, geoLocationTypeReducer } from './geo-location-type/geo-location-type.reducer';
import { GeoInfoState, geoInfoReducer } from './geo-info/geo-info.reducer';
import { compose } from '@ngrx/core/compose';
import { GeoActions } from './geo.actions';

export interface GeoState {
  geoSearch: GeoSearchState;
  geoSelected: GeoSelectedState;
  geoType: GeoTypeState;
  geoMode: GeoModeState;
  geoLocationType: GeoLocationTypeState;
  geoInfo: GeoInfoState;
}

export const GEO_TARGETING_STATE_KEY = 'geo';

function multiplyReducer (reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state = {}, action) {
    // console.log('state, action: ', state, action);
    if (action.type.includes('geo')) {
      let id = action.payload.id;

      if (action.type === GeoActions.GEO_TARGETING_DESTROY) {
        return Object.assign({}, state, {[id]: null});
      }

      let geo: Array<GeoState> = Object.assign({}, state[id]);

      return Object.assign({}, state, {[id]: reducer(geo, action)});
    } else {
      return state;
    }
  };
}

export const geoReducer = compose(multiplyReducer)(combineReducers({
  geoSearch:       geoSearchReducer,
  geoSelected:     geoSelectedReducer,
  geoType:         geoTypeReducer,
  geoMode:         geoModeReducer,
  geoLocationType: geoLocationTypeReducer,
  geoInfo:         geoInfoReducer
}));
