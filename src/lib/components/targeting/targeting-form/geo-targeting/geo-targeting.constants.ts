import { TargetingSpec } from '../../interfaces/targeting-spec.interface';
export const GEO_LIMITS = {
  region:          200,
  city:            250,
  zip:             2500,
  geo_market:      2500,
  custom_location: 200
};

export function getIsWithinLimitObject (spec: TargetingSpec) {
  /* tslint:disable:max-line-length */
  return {
    include: {
      region:          !spec.geo_locations.regions || spec.geo_locations.regions.length <= GEO_LIMITS.region,
      city:            !spec.geo_locations.cities || spec.geo_locations.cities.length <= GEO_LIMITS.city,
      zip:             !spec.geo_locations.zips || spec.geo_locations.zips.length <= GEO_LIMITS.zip,
      geo_market:      !spec.geo_locations.geo_markets || spec.geo_locations.geo_markets.length <= GEO_LIMITS.geo_market,
      custom_location: !spec.geo_locations.custom_locations || spec.geo_locations.custom_locations.length <= GEO_LIMITS.custom_location
    },
    exclude: {
      region:          !spec.excluded_geo_locations.regions || spec.excluded_geo_locations.regions.length <= GEO_LIMITS.region,
      city:            !spec.excluded_geo_locations.cities || spec.excluded_geo_locations.cities.length <= GEO_LIMITS.city,
      zip:             !spec.excluded_geo_locations.zips || spec.excluded_geo_locations.zips.length <= GEO_LIMITS.geo_market,
      geo_market:      !spec.excluded_geo_locations.geo_markets || spec.excluded_geo_locations.geo_markets.length <= GEO_LIMITS.zip,
      custom_location: !spec.excluded_geo_locations.custom_locations || spec.excluded_geo_locations.custom_locations.length <= GEO_LIMITS.custom_location
    }
  };
  /* tslint:enable:max-line-length */
}
export function isExceedLimit (spec: TargetingSpec) {
  const isWithinLimit = getIsWithinLimitObject(spec);

  const isGeoLocationsExceedLimit         = Object.values(isWithinLimit.include)
                                                  .includes(false);
  const isExcludedGeoLocationsExceedLimit = Object.values(isWithinLimit.exclude)
                                                  .includes(false);

  return isGeoLocationsExceedLimit || isExcludedGeoLocationsExceedLimit;
}
