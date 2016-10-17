export interface GeoTargetingType {
  id: string;
  name: string;
}

export const GEO_TARGETING_TYPE_STATE_KEY = 'geoTargetingType';

export interface GeoTargetingTypeState {
  available: Array<GeoTargetingType>;
  selected: Array<GeoTargetingType>;
  selectedId: string;
}
