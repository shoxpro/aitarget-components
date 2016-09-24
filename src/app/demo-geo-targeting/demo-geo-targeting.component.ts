import { Component, OnInit } from '@angular/core';

@Component({
  selector:    'app-demo-geo-targeting',
  templateUrl: './demo-geo-targeting.component.html',
  styleUrls:   ['./demo-geo-targeting.component.css']
})
export class DemoGeoTargetingComponent implements OnInit {

  spec = {
    'geo_locations':          {
      'location_types':      [
        'home'
      ],
      'regions':             [
        {
          'key':  '3153',
          'name': 'Omsk Oblast'
        },
        {
          'key':  '3146',
          'name': 'Moscow'
        }
      ],
      'zips':                [
        {
          'key':  'RU:192212',
          'name': '192212'
        },
        {
          'key':  'RU:125222',
          'name': '125222'
        },
        {
          'key':  'US:13439',
          'name': '13439'
        },
        {
          'key':  'US:94062',
          'name': '94062'
        },
        {
          'key':  'US:90028',
          'name': '90028'
        }
      ],
      'cities':              [
        {
          'key':  '2421862',
          'name': 'San Mateo'
        },
        {
          'key':  '2490299',
          'name': 'New York'
        }
      ],
      'geo_markets':         [
        {
          'key':  'DMA:501',
          'name': 'New York'
        },
        {
          'key':  'DMA:803',
          'name': 'Los Angeles'
        }
      ],
      'electoral_districts': [
        {
          'key':  'US:CA14',
          'name': `California's 14th District`
        }
      ]
    },
    'excluded_geo_locations': {
      'location_types': [
        'home'
      ],
      'cities':         [
        {
          'key':  '2036122',
          'name': 'Omsk'
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
