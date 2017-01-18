import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LocationType } from './geo-location-type.reducer';
import { GeoIdService } from '../geo.id';

@Injectable()
export class GeoLocationTypeActions {
  static SET_TRANSLATED_TYPES = '[geo-location-type] Set Translated Types';
  static SELECT_TYPE          = '[geo-location-type] Select Type';
  static SHOW_INFO_FOR_TYPE   = '[geo-location-type] Show Info For Type';
  static TOGGLE_TYPE_DROPDOWN = '[geo-location-type] Toggle Type Dropdown';

  setTranslatedTypes () {
    return {
      type:    GeoLocationTypeActions.SET_TRANSLATED_TYPES,
      payload: {
        id:    this.geoIdService.id$.getValue(),
        types: [
          {
            id:       'all',
            name:     this.translateService.instant(`fba-geo-location-type.ALL`),
            info:     this.translateService.instant(`fba-geo-location-type.ALL_INFO`),
            showInfo: false,
            value:    ['home', 'recent']
          },
          {
            id:       'home',
            name:     this.translateService.instant(`fba-geo-location-type.HOME`),
            info:     this.translateService.instant(`fba-geo-location-type.HOME_INFO`),
            showInfo: false,
            value:    ['home']
          },
          {
            id:       'recent',
            name:     this.translateService.instant(`fba-geo-location-type.RECENT`),
            info:     this.translateService.instant(`fba-geo-location-type.RECENT_INFO`),
            showInfo: false,
            value:    ['recent']
          },
          {
            id:       'travel_in',
            name:     this.translateService.instant(`fba-geo-location-type.TRAVEL_IN`),
            info:     this.translateService.instant(`fba-geo-location-type.TRAVEL_IN_INFO`),
            showInfo: false,
            value:    ['travel_in']
          },
        ]
      }
    };
  }

  selectType (selectedType: LocationType) {
    return {
      type:    GeoLocationTypeActions.SELECT_TYPE,
      payload: {
        id:           this.geoIdService.id$.getValue(),
        selectedType: selectedType
      }
    };
  }

  showInfoForType (type: LocationType) {
    return {
      type:    GeoLocationTypeActions.SHOW_INFO_FOR_TYPE,
      payload: {
        id:   this.geoIdService.id$.getValue(),
        type: type
      }
    };
  }

  toggleTypeDropdown (isOpen?: boolean) {
    return {
      type:    GeoLocationTypeActions.TOGGLE_TYPE_DROPDOWN,
      payload: {
        id:     this.geoIdService.id$.getValue(),
        isOpen: isOpen
      }
    };
  }

  constructor (private translateService: TranslateService,
               private geoIdService: GeoIdService) {}
}
