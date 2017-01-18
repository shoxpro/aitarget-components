import { Injectable } from '@angular/core';
import { GeoModeType } from './geo-mode.reducer';
import { TranslateService } from 'ng2-translate';
import { GeoIdService } from '../geo.id';
import { Action } from '@ngrx/store';

@Injectable()
export class GeoModeActions {

  static SET_MODE             = '[geo-mode] Set Mode';
  static SET_TRANSLATED_MODES = '[geo-mode] Set Translated Modes';
  static TOGGLE_MODE_DROPDOWN = '[geo-mode] Toggle Mode Dropdown';

  setMode (selectedMode: GeoModeType): Action {
    return {
      type:    GeoModeActions.SET_MODE,
      payload: {
        id:           this.geoIdService.id$.getValue(),
        selectedMode: selectedMode
      }
    };
  }

  setTranslatedModes (): Action {
    return {
      type:    GeoModeActions.SET_TRANSLATED_MODES,
      payload: {
        id:    this.geoIdService.id$.getValue(),
        modes: [
          {
            id:   'include',
            name: this.translateService.instant(`fba-geo-mode.include`)
          },
          {
            id:   'exclude',
            name: this.translateService.instant(`fba-geo-mode.exclude`)
          },
          {
            id:   'delete',
            name: this.translateService.instant(`fba-geo-mode.delete`)
          }
        ]
      }
    };
  }

  toggleModeDropdown (isOpen?: boolean): Action {
    return {
      type:    GeoModeActions.TOGGLE_MODE_DROPDOWN,
      payload: {
        id:     this.geoIdService.id$.getValue(),
        isOpen: isOpen
      }
    };
  }

  constructor (private translateService: TranslateService,
               private geoIdService: GeoIdService) {}
}
