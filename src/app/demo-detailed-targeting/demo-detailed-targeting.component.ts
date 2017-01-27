import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector:        'fba-demo-detailed',
  templateUrl:     'demo-detailed-targeting.component.html',
  styleUrls:       ['demo-detailed-targeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoDetailedTargetingComponent {

  hideDetailed  = false;
  isSpecVisible = false;

  spec = {
    'geo_locations':                 {'location_types': ['home', 'recent'], 'countries': ['US']},
    'age_min':                       18,
    'age_max':                       65,
    'publisher_platforms':           ['facebook', 'instagram', 'audience_network'],
    'facebook_positions':            ['feed', 'instant_article', 'right_hand_column'],
    'instagram_positions':           ['stream'],
    'device_platforms':              ['mobile', 'desktop'],
    'excluded_publisher_categories': [],
    'excluded_publisher_list_ids':   [],
    'user_device':                   [],
    'excluded_user_device':          [],
    'user_os':                       [],
    'wireless_carrier':              [],
    // 'interests':                     [
    //   '6002979499920'
    // ],
    // 'behaviors':                     [
    //   '6002714895372'
    // ]
    // /*'exclusions':                    {'interested_in': ['2']},*/
    /*'flexible_spec':                 [{
     'interests': [{'id': '6003384248805', 'name': 'Fitness and wellness'}, {'id': '6003355530237', 'name': 'Gyms'}]
     }, {'behaviors': [{'id': '6002714895372', 'name': 'All frequent travelers'}], 'relationship_statuses': ['3']}]*/
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
