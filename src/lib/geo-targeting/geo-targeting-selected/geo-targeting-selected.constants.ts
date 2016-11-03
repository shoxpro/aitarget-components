import { GeoTargetingItem } from '../geo-targeting-item.interface';

export const typeMap = {
  country:            'countries',
  region:             'regions',
  city:               'cities',
  zip:                'zips',
  geo_market:         'geo_markets',
  electoral_district: 'electoral_districts',
  custom_location:    'custom_locations'
};

export function sortItems (items) {
  return items.sort((a: GeoTargetingItem, b: GeoTargetingItem) => a.excluded > b.excluded);
}

export function isNarrower (item: GeoTargetingItem, selectedItem: GeoTargetingItem) {
  return (
    /*passed item is a country of selected item*/
    selectedItem.country_code === item.key ||
    /*passed item is a region of selected item*/
    (selectedItem.region_id && selectedItem.region_id.toString() === item.key) ||
    /*passed item is a zip code of selected item*/
    (selectedItem.primary_city_id && selectedItem.primary_city_id.toString() === item.key)
  );
}

export function isBroader (item: GeoTargetingItem, selectedItem: GeoTargetingItem) {
  return (
    /*country of passed item is selected*/
    selectedItem.key === item.country_code ||
    /*region of passed item is selected*/
    (item.region_id && selectedItem.key === item.region_id.toString()) ||
    /*city of passed item is selected*/
    (item.primary_city_id && selectedItem.key === item.primary_city_id.toString())
  );
}
