import { City, CustomLocation } from '../targeting/targeting-spec-geo.interface';
export interface GeoTargetingItem extends City, CustomLocation {
  /**
   * Property of all types of locations
   */
  key: string;
  /**
   * Property of all types of locations
   */
  name?: string;
  /**
   * Property of all types of locations
   */
  type?: string;
  /**
   * Property of all types of locations
   */
  supports_region?: boolean;
  /**
   * Property of all types of locations
   */
  supports_city?: boolean;
  /**
   * Property of Countries|Regions|Cities|Zip Code|DMA Codes|Electoral Districts
   */
  country_code?: string;
  /**
   * Property of Countries|Regions|Cities|Zip Code|DMA Codes|Electoral Districts
   */
  country_name?: string;
  /**
   * Property of Cities|Zip Code|Electoral Districts
   */
  region?: string;
  /**
   * Property of Cities|Zip Code|Electoral Districts
   */
  region_id?: number;
  /**
   * Property of Country Group
   */
  country_codes?: Array<string>;
  /**
   * Property of Country Group
   */
  is_worldwide?: boolean;
  /**
   * Property of Zip Code
   */
  primary_city?: string;
  /**
   * Property of Zip Code
   */
  primary_city_id?: number;
  /**
   * Flag for excluded locations
   */
  excluded?: boolean;
}
