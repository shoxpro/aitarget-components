import { combineReducers } from '@ngrx/store';
import { geoTargetingTypeReducer } from './geo-targeting-type/geo-targeting-type.reducer';
import { geoTargetingSearchReducer } from './geo-targeting-search/geo-taregting-search.reducer';

export const geoTargetingReducer = combineReducers({
  geoTargetingSearch: geoTargetingSearchReducer,
  geoTargetingType:   geoTargetingTypeReducer,
});
