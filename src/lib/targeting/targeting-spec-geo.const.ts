import { GeoTargetingSpec } from './targeting-spec-geo.interface';
export const defaultGeoTargetingSpec: GeoTargetingSpec = {
  countries:          [],
  regions:            [],
  cities:             [],
  zips:               [],
  custom_locations:   [],
  geo_markets:        [],
  electoral_district: [],
  location_types:     [],
  country_groups:     []
};
