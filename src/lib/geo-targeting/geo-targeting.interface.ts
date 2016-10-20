import { GeoTargetingTypeState } from './geo-targeting-type/geo-targeting-type.interface';

export const GEO_TARGETING_STATE_KEY = 'geoTargeting';

export interface GeoTargetingState {
  geoTargetingType: GeoTargetingTypeState;
}
