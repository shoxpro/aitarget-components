/* tslint:disable:max-line-length */
import { geoTargetingReducer, GeoTargetingState } from './components/targeting/targeting-form/geo-targeting/geo-targeting.reducer';
import { targetingReducer } from './components/targeting/targeting.reducer';
/* tslint:enable:max-line-length */

export interface LibState {
  geoTargeting: GeoTargetingState;
}

export const LIB_REDUCERS = {
  geoTargeting: geoTargetingReducer,
  targeting:    targetingReducer
};
