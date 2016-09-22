interface Key {
  key: string;
  name?: string;
}

interface City {
  key: string;
  radius?: number;
  distance_unit?: 'mile' | 'kilometer';
}

interface CustomLocation {
  latitude?: number; /*float*/
  longitude?: number; /*float*/
  /**
   * Descriptive name for the address. This can be used in conjunction with
   * the `latitude` and `longitude` values for geo location targeting even when
   * the `address_string` is not provided
   */
  name?: string;
  /**
   * Radius around the latitude/longitude, expressed in miles unless set in the distance_unit field.
   * The limits of the radius are 0.62 to 50 miles, or 1 to 80 kilometers.
   */
  radius?: number; /*int*/
  /**
   * Optional value of kilometer or mile, defaults to mile
   */
  distance_unit?: 'mile' | 'kilometer';
  /**
   * Address corresponding to the latitude/longitude. e.g. 1601 Willow Rd, Menlo Park, CA.
   * The suggested address format is: street number street name, city, state/province, country.
   * Please do not include the postal code in the address_string.
   */
  address_string?: string;
}

/**
 * Possible values are:
 *
 * `recent`: People whose most recent location is the selected area, as determined by information from their
 * mobile device. This value is not available when excluding location types.
 *
 * `home`: People whose stated location from their Facebook profile “current city” is within that location.
 * This is also validated by IP address and aggregated information from their friends’ stated profile locations.
 *
 * `travel_in`: People whose most recent location is the selected area, as determined by information from their mobile
 * device, and are more than 100 miles away from their stated current city from their Facebook profiles.
 * This value is not available when excluding location types.
 */
type LocationType = 'recent' | 'home' | 'travel_in';

type CountryGroup = 'worldwide' | 'africa' | 'south_america'
  | 'central_america' | 'caribbean' | 'north_america' | 'europe' | 'asia' | 'oceania'
  | 'eea' /*for European Economic Area*/ | 'nafta' /*for North American Free Trade Agreement*/
  | 'afta' /*for ASEAN Free Trade Area*/ | 'mercosur' | 'gcc' /*Gulf Cooperation Council*/
  | 'apec' /*Asia-Pacific Economic Cooperation*/ | 'cisfta' /*Commonwealth of Independent States Free Trade Area*/;

/**
 * Describe properties of targeting spec for geo locations
 * @see https://developers.facebook.com/docs/marketing-api/targeting-specs/v2.7#location
 */
export interface GeoTargetingSpec {
  /**
   * Values for country targeting. It must be an array of country codes.
   * @see https://developers.facebook.com/docs/reference/ads-api/get-autocomplete-data/#countries
   * @example
   * 'countries': ['RU']
   */
  countries?: Array<string>;
  /**
   * State, province, or region. To get the available values. Limit: 200 regions.
   * @see https://developers.facebook.com/docs/reference/ads-api/get-autocomplete-data/#regions
   * @example
   * 'regions': [{'key':'3847'}]
   */
  regions?: Array<Key>;
  /**
   * Specify the key, radius & distance_unit. For the key values, see targeting search API.
   * `radius` is a number around cities, limits are 10 to 50 miles or 17 to 80 kilometers.
   * `distance_unit` is mile or kilometer. Limit: 250 cities.
   * @see https://developers.facebook.com/docs/reference/ads-api/get-autocomplete-data/#cities
   * @example
   * 'cities': [{'key':'2430536', 'radius':12, 'distance_unit':'mile'}]
   */
  cities?: Array<City>;
  /**
   * Zip Codes for targeting. Limit: 2500 Zips
   * @see https://developers.facebook.com/docs/reference/ads-api/get-autocomplete-data/#zipcode
   * @example
   * 'zips':[{'key':'US:94304'},{'key':'US:00501'}]
   */
  zips?: Array<Key>;
  /**
   * Available in all objectives.
   * It requires you to specify an exact location in latitude/longitude or specify an address
   * line as the center of your targeted area. You also need to specify a `radius` for your location,
   * limits from .62 to 50 miles, or 1 to 80 kilometers. `distance_unit` can be in miles or kilometers.
   * The default `distance_unit` is mile. Limit: 200 addresses.
   * Note that PO Box is not supported in the address_string. Only the physical address can be passed.
   * @example
   * 'custom_locations':[
   *  {'address_string': '1601 Willow Road, Menlo Park, CA', 'radius': 5},
   *  {'latitude': 36, 'longitude': -121.0, 'radius': 5, 'distance_unit': 'kilometer'}
   * ]
   */
  custom_locations?: Array<CustomLocation>;
  /**
   * Specify the key for the market. We support all designated market areas (DMA) and the key
   * is in the format “DMA:501”. The DMA code can be retrieved from the
   * {@link https://developers.facebook.com/docs/marketing-api/targeting-search|Targeting Search} endpoint
   * by querying by the name of the DMA. Limit: 2500
   * @example
   * 'geo_markets':[{'key': 'DMA:501', 'name': 'New York'},{'key': 'DMA:543', 'name': 'Springfield-Holyoke'}]
   */
  geo_markets?: Array<Key>;
  /**
   * Specify the key for electoral districts.
   * The district key can be retrieved from the
   * [Targeting Search API]{@link https://developers.facebook.com/docs/marketing-api/targeting-search#electoral}.
   * @example
   * 'electoral_districts':[{'key':'US:AK00'},{'key':'US:CA01'},{'key':'US:NY14'}]
   */
  electoral_district?: Array<Key>;
  /**
   * Please Note:
   * If location_types is not specified, the default value is ['home'].
   * `travel_in` cannot be used with other values in the location_types.
   * If you want to target “everyone in this location”, you need to add both recent and home in the location_types field.
   *
   * @example
   * 'location_types':['recent', 'home']
   * 'location_types':['travel_in']
   */
  location_types?: Array<LocationType>;
  /**
   * Values for targeting countries in global geographical regions and free trade areas.
   * It must be an array of country group codes.
   * @example
   * 'country_groups': ['asia','mercosur']
   */
  country_groups?: Array<CountryGroup>;
}
