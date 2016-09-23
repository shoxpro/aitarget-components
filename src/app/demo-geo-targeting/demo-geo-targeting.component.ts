import { Component, OnInit } from '@angular/core';

@Component({
  selector:    'app-demo-geo-targeting',
  templateUrl: './demo-geo-targeting.component.html',
  styleUrls:   ['./demo-geo-targeting.component.css']
})
export class DemoGeoTargetingComponent implements OnInit {

  spec = {
    'geo_locations':          {
      'zips':                [
        {
          'key':     'US:13439',
          'name':    '13439',
          'country': 'US'
        },
        {
          'key':     'US:94062',
          'name':    '94062',
          'country': 'US'
        },
        {
          'key':     'US:90028',
          'name':    '90028',
          'country': 'US'
        }
      ],
      'location_types':      [
        'home',
        'recent'
      ],
      'regions':             [
        {
          'key':     '3153',
          'name':    'Omsk Oblast',
          'country': 'RU'
        },
        {
          'key':     '3147',
          'name':    'Moscow Oblast',
          'country': 'RU'
        },
        {
          'key':     '3146',
          'name':    'Moscow',
          'country': 'RU'
        }
      ],
      'cities':              [
        {
          'distance_unit': 'mile',
          'key':           '2421862',
          'name':          'San Mateo',
          'region':        'California',
          'region_id':     '3847',
          'radius':        25,
          'country':       'US'
        },
        {
          'distance_unit': 'mile',
          'key':           '2490299',
          'name':          'New York',
          'region':        'New York',
          'region_id':     '3875',
          'radius':        25,
          'country':       'US'
        }
      ],
      'geo_markets':         [
        {
          'key':     'DMA:501',
          'name':    'New York',
          'country': 'US'
        },
        {
          'key':     'DMA:803',
          'name':    'Los Angeles',
          'country': 'US'
        }
      ],
      'electoral_districts': [
        {
          'key':     'US:CA14',
          'name':    `California's 14th District`,
          'country': 'US'
        }
      ]
    },
    'excluded_geo_locations': {
      'cities': [
        {
          'distance_unit': 'mile',
          'key':           '2036122',
          'name':          'Omsk',
          'region':        'Omsk Oblast',
          'region_id':     '3153',
          'radius':        25,
          'country':       'RU'
        }
      ]
    }
  };

  onChange = (spec) => {
    this.spec = spec;
  };

  constructor () { }

  ngOnInit () {
  }

}
