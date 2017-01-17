import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { GeoTargetingType } from './geo-targeting-type.reducer';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingIdService } from '../geo-targeting.id';

@Injectable()
export class GeoTargetingTypeActions {
  static SET_TRANSLATED_SEARCH_TYPES = '[geo-targeting-type] Set Translated Search Types';
  static SELECT_SEARCH_TYPE          = '[geo-targeting-type] Select Search Type';
  static TOGGLE_SEARCH_TYPE_DROPDOWN = '[geo-targeting-type] Toggle Search Type Dropdown';

  setTranslatedSearchType (): Action {
    return {
      type:    GeoTargetingTypeActions.SET_TRANSLATED_SEARCH_TYPES,
      payload: {
        id:    this.geoTargetingIdService.id$.getValue(),
        types: [
          {id: 'all', name: this.translateService.instant(`geo-targeting-dropdown.all`)},
          {id: 'country', name: this.translateService.instant(`geo-targeting-dropdown.country`)},
          {id: 'country_group', name: this.translateService.instant(`geo-targeting-dropdown.country_group`)},
          {id: 'region', name: this.translateService.instant(`geo-targeting-dropdown.region`)},
          {id: 'geo_market', name: this.translateService.instant(`geo-targeting-dropdown.geo_market`)},
          {id: 'city', name: this.translateService.instant(`geo-targeting-dropdown.city`)},
          {id: 'electoral_district', name: this.translateService.instant(`geo-targeting-dropdown.electoral_district`)},
          {id: 'political_district', name: this.translateService.instant(`geo-targeting-dropdown.political_district`)},
          {id: 'zip', name: this.translateService.instant(`geo-targeting-dropdown.zip`)},
          {id: 'custom_location', name: this.translateService.instant(`geo-targeting-dropdown.custom_location`)},
          {id: 'place', name: this.translateService.instant(`geo-targeting-dropdown.place`)}
        ]
      }
    };
  }

  selectSearchType (selectedType: GeoTargetingType): Action {
    return {
      type:    GeoTargetingTypeActions.SELECT_SEARCH_TYPE,
      payload: {
        id:           this.geoTargetingIdService.id$.getValue(),
        selectedType: selectedType
      }
    };
  }

  toggleSearchTypeDropdown (isOpen: boolean): Action {
    return {
      type:    GeoTargetingTypeActions.TOGGLE_SEARCH_TYPE_DROPDOWN,
      payload: {
        id:     this.geoTargetingIdService.id$.getValue(),
        isOpen: isOpen
      }
    };
  }

  constructor (private translateService: TranslateService,
               private geoTargetingIdService: GeoTargetingIdService) {}
}
