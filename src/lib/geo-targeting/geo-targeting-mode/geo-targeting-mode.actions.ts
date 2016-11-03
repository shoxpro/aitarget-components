import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingModeType } from './geo-targeting-mode.reducer';

@Injectable()
export class GeoTargetingModeActions {

  static SET_MODE             = '[geo-targeting-mode] Set Mode';
  static SET_TRANSLATED_MODES = '[geo-targeting-mode] Set Translated Modes';
  static TOGGLE_MODE_DROPDOWN = '[geo-targeting-mode] Toggle Mode Dropdown';

  setMode (selectedMode: GeoTargetingModeType) {
    return {
      type:    GeoTargetingModeActions.SET_MODE,
      payload: {selectedMode}
    };
  }

  setTranslatedModes () {
    return {
      type:    GeoTargetingModeActions.SET_TRANSLATED_MODES,
      payload: {
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

  toggleModeDropdown (isOpen?: boolean) {
    return {
      type:    GeoTargetingModeActions.TOGGLE_MODE_DROPDOWN,
      payload: {isOpen}
    };
  }

  constructor (private translateService: TranslateService) {}
}
