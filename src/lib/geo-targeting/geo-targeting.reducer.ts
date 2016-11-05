import { combineReducers } from '@ngrx/store';
import { geoTargetingTypeReducer, GeoTargetingTypeState } from './geo-targeting-type/geo-targeting-type.reducer';
import {
  geoTargetingSearchReducer, GeoTargetingSearchState
} from './geo-targeting-search/geo-taregting-search.reducer';
import { geoTargetingModeReducer, GeoTargetingModeState } from './geo-targeting-mode/geo-targeting-mode.reducer';
import {
  geoTargetingSelectedReducer, GeoTargetingSelectedState
} from './geo-targeting-selected/geo-targeting-selected.reducer';
import {
  geoTargetingLocationTypeReducer, GeoTargetingLocationTypeState
} from './geo-targeting-location-type/geo-targeting-location-type.reducer';
import { geoTargetingInfoReducer, GeoTargetingInfoState } from './geo-targeting-info/geo-targeting-info.reducer';

export interface GeoTargetingState {
  geoTargetingSearch: GeoTargetingSearchState;
  geoTargetingSelected: GeoTargetingSelectedState;
  geoTargetingType: GeoTargetingTypeState;
  geoTargetingMode: GeoTargetingModeState;
  geoTargetingLocationType: GeoTargetingLocationTypeState;
  geoTargetingInfo: GeoTargetingInfoState;
}

export const GEO_TARGETING_STATE_KEY = 'geoTargeting';

export const geoTargetingReducer = combineReducers({
  geoTargetingSearch:       geoTargetingSearchReducer,
  geoTargetingSelected:     geoTargetingSelectedReducer,
  geoTargetingType:         geoTargetingTypeReducer,
  geoTargetingMode:         geoTargetingModeReducer,
  geoTargetingLocationType: geoTargetingLocationTypeReducer,
  geoTargetingInfo:         geoTargetingInfoReducer
});
