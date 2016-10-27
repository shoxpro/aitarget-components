import { combineReducers } from '@ngrx/store';
import { geoTargetingTypeReducer } from './geo-targeting-type/geo-targeting-type.reducer';
import { geoTargetingSearchReducer } from './geo-targeting-search/geo-taregting-search.reducer';
import { geoTargetingModeReducer } from './geo-targeting-mode/geo-targeting-mode.reducer';
import { geoTargetingSelectedReducer } from './geo-targeting-selected/geo-targeting-selected.reducer';

export const geoTargetingReducer = combineReducers({
  geoTargetingSearch:   geoTargetingSearchReducer,
  geoTargetingSelected: geoTargetingSelectedReducer,
  geoTargetingType:     geoTargetingTypeReducer,
  geoTargetingMode:     geoTargetingModeReducer
});
