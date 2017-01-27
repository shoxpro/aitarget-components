import { GeoItem } from '../geo-item.interface';

export const typeMap = {
  country:            'countries',
  region:             'regions',
  city:               'cities',
  zip:                'zips',
  geo_market:         'geo_markets',
  country_group:      'country_groups',
  electoral_district: 'electoral_districts',
  custom_location:    'custom_locations',
  place:              'places',
};

export function sortItems (items) {
  return items.sort((a: GeoItem, b: GeoItem) => a.excluded > b.excluded);
}

export function isNarrower (item: GeoItem, selectedItem: GeoItem) {
  return (
    /*passed item is a country of selected item*/
    selectedItem.country_code === item.key ||
    /*passed item is a country group that includes selected item country*/
    (item.country_codes && (
        item.country_codes.includes(selectedItem.key) ||
        item.country_codes.includes(selectedItem.country_code)
      )
    ) ||
    /*passed item is always narrower than worldwide*/
    selectedItem.is_worldwide ||
    /*passed item is a region of selected item*/
    (selectedItem.region_id && selectedItem.region_id.toString() === item.key) ||
    /*passed item is a zip code of selected item*/
    (selectedItem.primary_city_id && selectedItem.primary_city_id.toString() === item.key)
  );
}

export function isBroader (item: GeoItem, selectedItem: GeoItem) {
  return (
    /*country of passed item is selected*/
    selectedItem.key === item.country_code ||
    /*country group of passed item is selected*/
    (selectedItem.country_codes && (
        selectedItem.country_codes.includes(item.key) ||
        selectedItem.country_codes.includes(item.country_code)
      )
    ) ||
    /*worldwide passed item is always broader than any other selected item*/
    item.is_worldwide ||
    /*region of passed item is selected*/
    (item.region_id && selectedItem.key === item.region_id.toString()) ||
    /*city of passed item is selected*/
    (item.primary_city_id && selectedItem.key === item.primary_city_id.toString())
  );
}
