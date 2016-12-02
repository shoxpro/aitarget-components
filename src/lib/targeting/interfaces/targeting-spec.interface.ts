import { DetailedTargetingSpec } from './targeting-spec-detailed.interface';
import { GeoTargetingSpec } from './targeting-spec-geo.interface';

export interface TargetingSpec extends DetailedTargetingSpec {
  geo_locations?: GeoTargetingSpec;
  excluded_geo_locations?: GeoTargetingSpec;
  gender?: any;
}

export const targetingSpecInitial: TargetingSpec = {
  'geo_locations':          {
    'location_types': [
      'home',
      'recent'
    ],
    'countries':      [
      'RU'
    ]
  },
  'excluded_geo_locations': {}
};
