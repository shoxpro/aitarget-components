import { GeoTargetingTypeState } from './geo-targeting-type.interface';

export const GeoTargetingTypeInitial: GeoTargetingTypeState = {
  selectedId: 'all',
  available:  [{id: 'all', name: 'All'}],
  selected:   []
};
