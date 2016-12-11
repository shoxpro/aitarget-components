import { Injectable } from '@angular/core';
import { GeoTargetingModeType } from './geo-targeting-mode.reducer';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingIdService } from '../geo-targeting.id';
import { Action } from '@ngrx/store';

@Injectable()
export class GeoTargetingModeActions {

  static SET_MODE             = '[geo-targeting-mode] Set Mode';
  static SET_TRANSLATED_MODES = '[geo-targeting-mode] Set Translated Modes';
  static TOGGLE_MODE_DROPDOWN = '[geo-targeting-mode] Toggle Mode Dropdown';

  setMode (selectedMode: GeoTargetingModeType): Action {
    return {
      type:    GeoTargetingModeActions.SET_MODE,
      payload: {
        id:           this.geoTargetingIdService.id$.getValue(),
        selectedMode: selectedMode
      }
    };
  }

  setTranslatedModes (): Action {
    return {
      type:    GeoTargetingModeActions.SET_TRANSLATED_MODES,
      payload: {
        id:    this.geoTargetingIdService.id$.getValue(),
        modes: [
          {
            id:   'include',
            name: this.translateService.instant(`geo-targeting-mode.include`)
          },
          {
            id:   'exclude',
            name: this.translateService.instant(`geo-targeting-mode.exclude`)
          },
          {
            id:   'delete',
            name: this.translateService.instant(`geo-targeting-mode.delete`)
          }
        ]
      }
    };
  }

  toggleModeDropdown (isOpen?: boolean): Action {
    return {
      type:    GeoTargetingModeActions.TOGGLE_MODE_DROPDOWN,
      payload: {
        id:     this.geoTargetingIdService.id$.getValue(),
        isOpen: isOpen
      }
    };
  }

  constructor (private translateService: TranslateService,
               private geoTargetingIdService: GeoTargetingIdService) {}
}
