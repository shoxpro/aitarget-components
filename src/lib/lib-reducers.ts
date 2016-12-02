import { geoTargetingReducer, GeoTargetingState } from './geo-targeting/geo-targeting.reducer';
import { targetingReducer } from './targeting/targeting.reducer';

export interface LibState {
  geoTargeting: GeoTargetingState;
}

export const LIB_REDUCERS = {
  geoTargeting: geoTargetingReducer,
  targeting:    targetingReducer
};
