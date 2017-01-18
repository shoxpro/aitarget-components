import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LocationType } from './geo-targeting-location-type.reducer';
import { GeoTargetingIdService } from '../geo-targeting.id';

@Injectable()
export class GeoTargetingLocationTypeActions {
  static SET_TRANSLATED_TYPES = '[geo-targeting-location-type] Set Translated Types';
  static SELECT_TYPE          = '[geo-targeting-location-type] Select Type';
  static SHOW_INFO_FOR_TYPE   = '[geo-targeting-location-type] Show Info For Type';
  static TOGGLE_TYPE_DROPDOWN = '[geo-targeting-location-type] Toggle Type Dropdown';

  setTranslatedTypes () {
    return {
      type:    GeoTargetingLocationTypeActions.SET_TRANSLATED_TYPES,
      payload: {
        id:    this.geoTargetingIdService.id$.getValue(),
        types: [
          {
            id:       'all',
            name:     this.translateService.instant(`geo-targeting-location-type.ALL`),
            info:     this.translateService.instant(`geo-targeting-location-type.ALL_INFO`),
            showInfo: false,
            value:    ['home', 'recent']
          },
          {
            id:       'home',
            name:     this.translateService.instant(`geo-targeting-location-type.HOME`),
            info:     this.translateService.instant(`geo-targeting-location-type.HOME_INFO`),
            showInfo: false,
            value:    ['home']
          },
          {
            id:       'recent',
            name:     this.translateService.instant(`geo-targeting-location-type.RECENT`),
            info:     this.translateService.instant(`geo-targeting-location-type.RECENT_INFO`),
            showInfo: false,
            value:    ['recent']
          },
          {
            id:       'travel_in',
            name:     this.translateService.instant(`geo-targeting-location-type.TRAVEL_IN`),
            info:     this.translateService.instant(`geo-targeting-location-type.TRAVEL_IN_INFO`),
            showInfo: false,
            value:    ['travel_in']
          },
        ]
      }
    };
  }

  selectType (selectedType: LocationType) {
    return {
      type:    GeoTargetingLocationTypeActions.SELECT_TYPE,
      payload: {
        id:           this.geoTargetingIdService.id$.getValue(),
        selectedType: selectedType
      }
    };
  }

  showInfoForType (type: LocationType) {
    return {
      type:    GeoTargetingLocationTypeActions.SHOW_INFO_FOR_TYPE,
      payload: {
        id:   this.geoTargetingIdService.id$.getValue(),
        type: type
      }
    };
  }

  toggleTypeDropdown (isOpen?: boolean) {
    return {
      type:    GeoTargetingLocationTypeActions.TOGGLE_TYPE_DROPDOWN,
      payload: {
        id:     this.geoTargetingIdService.id$.getValue(),
        isOpen: isOpen
      }
    };
  }

  constructor (private translateService: TranslateService,
               private geoTargetingIdService: GeoTargetingIdService) {}
}
