import { DetailedTargetingSpec } from '../interfaces/targeting-spec-detailed.interface';
import { GeoTargetingSpec } from '../interfaces/targeting-spec-geo.interface';

export interface TargetingForm {
  geoTargetings: Array<GeoTargetingSpec>;
  detailedTargetings: Array<DetailedTargetingSpec>;
}
