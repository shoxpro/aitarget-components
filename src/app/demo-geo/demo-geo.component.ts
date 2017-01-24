import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector:        'fba-demo-geo',
  templateUrl:     './demo-geo.component.html',
  styleUrls:       ['demo-geo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoGeoComponent {

  hideGeo       = false;
  isSpecVisible = false;

  spec = {
    'age_max':                   65,
    'age_min':                   35,
    'app_install_state':         'not_installed',
    'excluded_custom_audiences': [
      {
        'id':   '23842522405300178',
        'name': 'iScanner installs'
      },
      {
        'id':   '23842522432610178',
        'name': 'iScanner launch'
      }
    ],
    'excluded_geo_locations':    {
      'countries':      [
        'US',
        'CA',
        'GB',
        'AU',
        'DE'
      ],
      'location_types': [
        'home'
      ]
    },
    'flexible_spec':             [
      {
        'interests':          [
          {
            'id':   '6003164535634',
            'name': 'Information technology'
          },
          {
            'id':   '6003371274877',
            'name': 'Jurisprudence'
          },
          {
            'id':   '6003371567474',
            'name': 'Entrepreneurship'
          },
          {
            'id':   '6003402305839',
            'name': 'Business'
          }
        ],
        'education_statuses': [
          10,
          11,
          3,
          9
        ],
        'industries':         [
          {
            'id':   '6008888954983',
            'name': 'Administrative'
          },
          {
            'id':   '6008888961983',
            'name': 'IT and Technical'
          },
          {
            'id':   '6008888972183',
            'name': 'Legal'
          },
          {
            'id':   '6008888980183',
            'name': 'Sales'
          },
          {
            'id':   '6009003307783',
            'name': 'Business and Financial Operations'
          },
          {
            'id':   '6009003311983',
            'name': 'Management'
          },
          {
            'id':   '6012903126783',
            'name': 'Architecture and Engineering'
          },
          {
            'id':   '6012903167783',
            'name': 'Computer and Mathematics'
          },
          {
            'id':   '6019621029983',
            'name': 'Government Employees'
          }
        ]
      }
    ],
    'genders':                   [
      1
    ],
    'geo_locations':             {
      'country_groups': [
        'worldwide'
      ],
      'location_types': [
        'home',
        'recent'
      ]
    },
    'locales':                   [
      24,
      6
    ],
    'targeting_optimization':    'expansion_all',
    'user_device':               [
      'iphone 6',
      'iphone 6 plus',
      'iphone 6s',
      'iphone 6s plus',
      'iphone 7',
      'iphone 7 plus'
    ],
    'user_os':                   [
      'iOS_ver_9.0_and_above'
    ],
    'publisher_platforms':       [
      'facebook',
      'audience_network'
    ],
    'facebook_positions':        [
      'feed'
    ],
    'device_platforms':          [
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

  constructor (private changeDetectorRef: ChangeDetectorRef) { }
}
