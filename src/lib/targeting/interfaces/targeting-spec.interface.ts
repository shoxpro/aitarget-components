import { DetailedTargetingSpec } from './targeting-spec-detailed.interface';
import { GeoTargetingSpec, geoTargetingSpecInitial } from './targeting-spec-geo.interface';

export interface TargetingSpec extends DetailedTargetingSpec {
  geo_locations?: GeoTargetingSpec;
  excluded_geo_locations?: GeoTargetingSpec;
  gender?: any;
}

export const targetingSpecInitial: TargetingSpec = {
  'geo_locations':          geoTargetingSpecInitial,
  'excluded_geo_locations': {}
};
