import { DetailedTargetingSpec } from '../interfaces/targeting-spec-detailed.interface';
import { GeoTargetingSpec } from '../interfaces/targeting-spec-geo.interface';
import { targetingSpecInitial } from '../interfaces/targeting-spec.interface';

export interface TargetingForm {
  geoTargetings: Array<GeoTargetingSpec>;
  detailedTargetings: Array<DetailedTargetingSpec>;
}

export const targetingFormInitial: TargetingForm = {
  geoTargetings:      [targetingSpecInitial],
  detailedTargetings: [targetingSpecInitial]
};
