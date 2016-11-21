import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector:        'app-demo-detailed-targeting',
  templateUrl:     './demo-detailed-targeting.component.html',
  styleUrls:       ['demo-detailed-targeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoDetailedTargetingComponent implements OnInit {

  hideDetailedTargeting = false;
  isSpecVisible         = false;
  lang                  = 'en_US';

  spec = {
    'age_max':             65,
    'age_min':             18,
    'app_install_state':   'not_installed',
    'education_majors':    [
      {
        'id':   '108180979203954',
        'name': 'Economics'
      }
    ],
    'education_schools':   [
      {
        'id':   '112070142203026',
        'name': 'Harvard Medical School'
      },
      {
        'id':   '208357009185713',
        'name': 'Stanford Graduate School of Business'
      },
      {
        'id':   '268833636515481',
        'name': 'Harobanda'
      },
      {
        'id':   '66459568171',
        'name': 'Harvard Business School'
      }
    ],
    'genders':             [
      1
    ],
    'geo_locations':       {
      'countries':      [
        'RU'
      ],
      'location_types': [
        'home'
      ]
    },
    'interests':           [
      {
        'id':   '6002839660079',
        'name': 'Cosmetics'
      },
      {
        'id':   '6003088846792',
        'name': 'Beauty salons'
      },
      {
        'id':   '6003423248519',
        'name': 'Hair care'
      }
    ],
    'user_os':             [
      'iOS'
    ],
    'publisher_platforms': [
      'facebook',
      'instagram'
    ],
    'facebook_positions':  [
      'feed'
    ],
    'device_platforms':    [
      'mobile'
    ]
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
