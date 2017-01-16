import { Component, OnInit } from '@angular/core';

@Component({
  selector:    'app-demo-geo-targeting',
  templateUrl: './demo-geo-targeting.component.html',
  styleUrls:   ['demo-geo-targeting.component.scss']
})
export class DemoGeoTargetingComponent implements OnInit {

  hideGeoTargeting = false;
  showSpec         = false;
  lang             = 'en_US';

  spec = {
    'geo_locations':          {
      'location_types': [
        'home',
        'recent'
      ],
      'countries':      [
        'RU'
      ]
    },
    'excluded_geo_locations': {}
  };

  onChange = (spec) => {
    this.spec = spec;
  };

  constructor () { }

  ngOnInit () {
  }

}
