import { GeoTargetingTypeState } from './geo-targeting-type.interface';

const all   = {id: 'all', name: 'all'};
const types = [
  {id: 'country', name: 'country'},
  {id: 'region', name: 'region'},
  {id: 'geo_market', name: 'geo_market'},
  {id: 'city', name: 'city'},
  {id: 'electoral_district', name: 'electoral_district'},
  {id: 'political_district', name: 'political_district'},
  {id: 'zip', name: 'zip'},
  {id: 'custom_location', name: 'custom_location'},
  {id: 'place', name: 'place'}
];

export const geoTargetingTypeInitial: GeoTargetingTypeState = {
  selectedType: all,
  available:    [
    all,
    ...types
  ],
  selected:     types,
  isOpen:       false
};
