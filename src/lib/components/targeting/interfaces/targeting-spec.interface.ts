import { DetailedTargetingSpec } from './targeting-spec-detailed.interface';
import { GeoTargetingSpec, geoTargetingSpecInitial } from './targeting-spec-geo.interface';
import { GendersSpec } from './targeting-spec-gender.interface';
import { AgeSpec, ageInitial } from './targeting-spec-age.interface';
import { LocalesSpec } from './targeting-spec-locales.interface';

export interface TargetingSpec extends DetailedTargetingSpec, GendersSpec, AgeSpec, LocalesSpec {
  geo_locations?: GeoTargetingSpec;
  excluded_geo_locations?: GeoTargetingSpec;
}

export const targetingSpecInitial: TargetingSpec = {
  'geo_locations':          geoTargetingSpecInitial,
  'excluded_geo_locations': {},
  'age_min':                ageInitial.age_min,
  'age_max':                ageInitial.age_max
};
