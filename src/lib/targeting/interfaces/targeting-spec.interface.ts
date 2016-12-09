import { DetailedTargetingSpec } from './targeting-spec-detailed.interface';
import { GeoTargetingSpec, geoTargetingSpecInitial } from './targeting-spec-geo.interface';
import { GendersSpec } from './targeting-spec-gender.interface';

export interface TargetingSpec extends DetailedTargetingSpec, GendersSpec {
  geo_locations?: GeoTargetingSpec;
  excluded_geo_locations?: GeoTargetingSpec;
}

export const targetingSpecInitial: TargetingSpec = {
  'geo_locations':          geoTargetingSpecInitial,
  'excluded_geo_locations': {}
};
