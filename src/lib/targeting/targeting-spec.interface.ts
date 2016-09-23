import { DetailedTargetingSpec } from './targeting-spec-detailed.interface';
import { GeoTargetingSpec } from './targeting-spec-geo.interface';
export interface TargetingSpec extends DetailedTargetingSpec {
  geo_locations?: GeoTargetingSpec;
  gender?: any;
}
