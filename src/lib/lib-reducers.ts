import { geoTargetingReducer, GeoTargetingState } from './geo-targeting/geo-targeting.reducer';

export interface LibState {
  geoTargeting: GeoTargetingState;
}

export const LIB_REDUCERS = {
  geoTargeting: geoTargetingReducer
};
