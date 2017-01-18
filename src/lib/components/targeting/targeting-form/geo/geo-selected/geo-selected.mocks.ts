import { GeoItem } from '../geo-item.interface';

export const country: GeoItem = {
  'key':             'RU',
  'name':            'Russia',
  'type':            'country',
  'country_code':    'RU',
  'country_name':    'Russia',
  'supports_region': true,
  'supports_city':   true
};

export const region: GeoItem = {
  'key':             '3165',
  'name':            'Saint Petersburg',
  'type':            'region',
  'country_code':    'RU',
  'country_name':    'Russia',
  'supports_region': true,
  'supports_city':   true
};

export const city: GeoItem = {
  'key':             '2057269',
  'name':            'Saint Petersburg',
  'type':            'city',
  'country_code':    'RU',
  'country_name':    'Russia',
  'region':          'Saint Petersburg',
  'region_id':       3165,
  'supports_region': true,
  'supports_city':   true
};

export const zip: GeoItem = {
  'key':             'RU:196128',
  'name':            '196128',
  'type':            'zip',
  'country_code':    'RU',
  'country_name':    'Russia',
  'region':          'Saint Petersburg',
  'region_id':       3165,
  'primary_city':    'Saint Petersburg',
  'primary_city_id': 2057269,
  'supports_region': true,
  'supports_city':   true
};
