import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector:        'app-demo-geo-targeting',
  templateUrl:     './demo-geo-targeting.component.html',
  styleUrls:       ['demo-geo-targeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoGeoTargetingComponent implements OnInit {

  hideGeoTargeting = false;
  isSpecVisible    = false;
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

  showSpec (isVisible, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.isSpecVisible = isVisible;

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  onChange = (spec) => {
    this.spec = spec;
  };

  constructor (private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit () {
  }

}
