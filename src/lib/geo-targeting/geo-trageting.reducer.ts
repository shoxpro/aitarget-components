import { combineReducers } from '@ngrx/store';
import { geoTargetingTypeReducer } from './geo-targeting-type/geo-targeting-type.reducer';
import { geoTargetingSearchReducer } from './geo-targeting-search/geo-taregting-search.reducer';
import { geoTargetingModeReducer } from './geo-targeting-mode/geo-targeting-mode.reducer';

export const geoTargetingReducer = combineReducers({
  geoTargetingSearch: geoTargetingSearchReducer,
  geoTargetingType:   geoTargetingTypeReducer,
  geoTargetingMode:   geoTargetingModeReducer
});
