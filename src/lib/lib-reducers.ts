/* tslint:disable:max-line-length */
import { geoReducer, GeoState } from './components/targeting/targeting-form/geo/geo.reducer';
import { targetingReducer } from './components/targeting/targeting.reducer';
/* tslint:enable:max-line-length */

export interface LibState {
  geo: GeoState;
}

export const LIB_REDUCERS = {
  geo:       geoReducer,
  targeting: targetingReducer
};
