import { geoTargetingReducer } from './geo-targeting/geo-trageting.reducer';
import { GeoTargetingState } from './geo-targeting/geo-targeting.interface';

export interface LibState {
  geoTargeting: GeoTargetingState;
}

export const LIB_REDUCERS = {
  geoTargeting: geoTargetingReducer
};
