export const countries = [
  {
    'key':             'UM',
    'name':            'United States Minor Outlying Islands',
    'type':            'country',
    'supports_city':   false,
    'supports_region': false
  },
  {
    'key':             'AE',
    'name':            'United Arab Emirates',
    'type':            'country',
    'supports_city':   false,
    'supports_region': false
  }];

export const country = {
  'key':             'GB',
  'name':            'United Kingdom',
  'type':            'country',
  'supports_city':   false,
  'supports_region': false
};

export const countryGroup = {
  'key':             'mercosur',
  'name':            'Mercosur',
  'type':            'country_group',
  'country_codes':   [
    'BR',
    'AR',
    'UY',
    'PY',
    'VE'
  ],
  'is_worldwide':    false,
  'supports_region': true,
  'supports_city':   true
};

export const regions = [
  {
    'key':             '3843',
    'name':            'Alabama',
    'type':            'region',
    'country_code':    'US',
    'country_name':    'United States',
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             '527',
    'name':            'Alberta',
    'type':            'region',
    'country_code':    'CA',
    'country_name':    'Canada',
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             '1089',
    'name':            'Alsace',
    'type':            'region',
    'country_code':    'FR',
    'country_name':    'France',
    'supports_region': true,
    'supports_city':   true
  }
];

export const region = {
  'key':             '3844',
  'name':            'Alaska',
  'type':            'region',
  'country_code':    'US',
  'country_name':    'United States',
  'supports_region': true,
  'supports_city':   true
};

export const cities = [
  {
    'key':             '2508065',
    'name':            'DuBois',
    'type':            'city',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'Pennsylvania',
    'region_id':       3881,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             '2444920',
    'name':            'Dubuque',
    'type':            'city',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'Iowa',
    'region_id':       3858,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             '2431771',
    'name':            'Dublin',
    'type':            'city',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'Georgia',
    'region_id':       3853,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             '1007098',
    'name':            'Dublin',
    'type':            'city',
    'country_code':    'IE',
    'country_name':    'Ireland',
    'region':          'Dublin',
    'region_id':       1696,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             '368',
    'name':            'Dubai',
    'type':            'city',
    'country_code':    'AE',
    'country_name':    'United Arab Emirates',
    'region':          'Dubai',
    'region_id':       10,
    'supports_region': true,
    'supports_city':   true
  }
];

export const city = {
  'key':             '2418956',
  'name':            'Dublin',
  'type':            'city',
  'country_code':    'US',
  'country_name':    'United States',
  'region':          'California',
  'region_id':       3847,
  'supports_region': true,
  'supports_city':   true
};

export const zips = [
  {
    'key':             'US:94110',
    'name':            '94110',
    'type':            'zip',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'California',
    'region_id':       3847,
    'primary_city':    'San Francisco',
    'primary_city_id': 2421836,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             'US:94501',
    'name':            '94501',
    'type':            'zip',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'California',
    'region_id':       3847,
    'primary_city':    'Alameda',
    'primary_city_id': 2417628,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             'US:95190',
    'name':            '95190',
    'type':            'zip',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'California',
    'region_id':       3847,
    'primary_city':    'San Jose',
    'primary_city_id': 2421846,
    'supports_region': true,
    'supports_city':   true
  }
];

export const zip = {
  'key':             'US:90028',
  'name':            '90028',
  'type':            'zip',
  'country_code':    'US',
  'country_name':    'United States',
  'region':          'California',
  'region_id':       3847,
  'primary_city':    'Los Angeles',
  'primary_city_id': 2420379,
  'supports_region': true,
  'supports_city':   true
};

export const geoMarkets = [
  {
    'key':             'DMA:622',
    'name':            'New Orleans',
    'type':            'geo_market',
    'country_code':    'US',
    'country_name':    'United States',
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             'DMA:533',
    'name':            'Hartford & New Haven',
    'type':            'geo_market',
    'country_code':    'US',
    'country_name':    'United States',
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             'DMA:521',
    'name':            'Providence-New Bedford',
    'type':            'geo_market',
    'country_code':    'US',
    'country_name':    'United States',
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             'DMA:544',
    'name':            'Norfolk-Portsmth-Newpt Nws',
    'type':            'geo_market',
    'country_code':    'US',
    'country_name':    'United States',
    'supports_region': true,
    'supports_city':   true
  }
];

export const geoMarket = {
  'key':             'DMA:501',
  'name':            'New York',
  'type':            'geo_market',
  'country_code':    'US',
  'country_name':    'United States',
  'supports_region': true,
  'supports_city':   true
};

export const electoralDistricts = [
  {
    'key':             'US:CA02',
    'name':            `California's 2nd District`,
    'type':            'electoral_district',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'California',
    'region_id':       3847,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             'US:CA24',
    'name':            `California's 24th District`,
    'type':            'electoral_district',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'California',
    'region_id':       3847,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             'US:CA19',
    'name':            `California's 19th District`,
    'type':            'electoral_district',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'California',
    'region_id':       3847,
    'supports_region': true,
    'supports_city':   true
  },
  {
    'key':             'US:CA15',
    'name':            `California's 15th District`,
    'type':            'electoral_district',
    'country_code':    'US',
    'country_name':    'United States',
    'region':          'California',
    'region_id':       3847,
    'supports_region': true,
    'supports_city':   true
  }];

export const electoralDistrict = {
  'key':             'US:CA14',
  'name':            `California's 14th District`,
  'type':            'electoral_district',
  'country_code':    'US',
  'country_name':    'United States',
  'region':          'California',
  'region_id':       3847,
  'supports_region': true,
  'supports_city':   true
};
