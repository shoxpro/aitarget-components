import { Component, OnInit } from '@angular/core';

@Component({
  selector:    'app-demo-geo-targeting',
  templateUrl: './demo-geo-targeting.component.html',
  styleUrls:   ['demo-geo-targeting.component.scss']
})
export class DemoGeoTargetingComponent implements OnInit {

  hideGeoTargeting  = false;
  showSpec          = false;
  lang              = 'en_US';

  spec = {
    'geo_locations':          {
      'location_types': [
        'home'
      ],
      'cities':         [
        {
          'key':           '2020916',
          'name':          'Moscow',
          'radius':        25,
          'distance_unit': 'mile'
        }
      ],
    },
    'excluded_geo_locations': {
      'location_types': [
        'home'
      ],
      'cities':         []
    }
  };

  onChange = (spec) => {
    this.spec = spec;
  };

  constructor () { }

  ngOnInit () {
  }

}
