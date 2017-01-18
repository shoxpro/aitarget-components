import { DetailedSpec } from './targeting-spec-detailed.interface';
import { GeoSpec, geoSpecInitial } from './targeting-spec-geo.interface';
import { GendersSpec } from './targeting-spec-gender.interface';
import { AgeSpec, ageInitial } from './targeting-spec-age.interface';
import { LocalesSpec } from './targeting-spec-locales.interface';

export interface TargetingSpec extends DetailedSpec, GendersSpec, AgeSpec, LocalesSpec {
  geo_locations?: GeoSpec;
  excluded_geo_locations?: GeoSpec;
}

export const targetingSpecInitial: TargetingSpec = {
  'geo_locations':          geoSpecInitial,
  'excluded_geo_locations': {},
  'age_min':                ageInitial.age_min,
  'age_max':                ageInitial.age_max
};
