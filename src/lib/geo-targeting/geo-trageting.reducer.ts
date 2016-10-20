import { combineReducers } from '@ngrx/store';
import { geoTargetingTypeReducer } from './geo-targeting-type/geo-targeting-type.reducer';

export const geoTargetingReducer = combineReducers({geoTargetingType: geoTargetingTypeReducer});
