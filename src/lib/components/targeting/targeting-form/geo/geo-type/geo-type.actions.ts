import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { GeoType } from './geo-type.reducer';
import { TranslateService } from 'ng2-translate';
import { GeoIdService } from '../geo.id';

@Injectable()
export class GeoTypeActions {
  static SET_TRANSLATED_SEARCH_TYPES = '[geo-type] Set Translated Search Types';
  static SELECT_SEARCH_TYPE          = '[geo-type] Select Search Type';
  static TOGGLE_SEARCH_TYPE_DROPDOWN = '[geo-type] Toggle Search Type Dropdown';

  setTranslatedSearchType (): Action {
    return {
      type:    GeoTypeActions.SET_TRANSLATED_SEARCH_TYPES,
      payload: {
        id:    this.geoIdService.id$.getValue(),
        types: [
          {id: 'all', name: this.translateService.instant(`fba-geo-dropdown.all`)},
          {id: 'country', name: this.translateService.instant(`fba-geo-dropdown.country`)},
          {id: 'country_group', name: this.translateService.instant(`fba-geo-dropdown.country_group`)},
          {id: 'region', name: this.translateService.instant(`fba-geo-dropdown.region`)},
          {id: 'geo_market', name: this.translateService.instant(`fba-geo-dropdown.geo_market`)},
          {id: 'city', name: this.translateService.instant(`fba-geo-dropdown.city`)},
          {id: 'electoral_district', name: this.translateService.instant(`fba-geo-dropdown.electoral_district`)},
          {id: 'political_district', name: this.translateService.instant(`fba-geo-dropdown.political_district`)},
          {id: 'zip', name: this.translateService.instant(`fba-geo-dropdown.zip`)},
          {id: 'custom_location', name: this.translateService.instant(`fba-geo-dropdown.custom_location`)},
          {id: 'place', name: this.translateService.instant(`fba-geo-dropdown.place`)}
        ]
      }
    };
  }

  selectSearchType (selectedType: GeoType): Action {
    return {
      type:    GeoTypeActions.SELECT_SEARCH_TYPE,
      payload: {
        id:           this.geoIdService.id$.getValue(),
        selectedType: selectedType
      }
    };
  }

  toggleSearchTypeDropdown (isOpen: boolean): Action {
    return {
      type:    GeoTypeActions.TOGGLE_SEARCH_TYPE_DROPDOWN,
      payload: {
        id:     this.geoIdService.id$.getValue(),
        isOpen: isOpen
      }
    };
  }

  constructor (private translateService: TranslateService,
               private geoIdService: GeoIdService) {}
}
