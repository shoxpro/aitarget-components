import { Injectable } from '@angular/core';
import { GeoTargetingModeType } from './geo-targeting-mode.reducer';

@Injectable()
export class GeoTargetingModeActions {

  static SET_MODE             = '[geo-targeting-mode] Set Mode';
  static TOGGLE_MODE_DROPDOWN = '[geo-targeting-mode] Toggle Mode Dropdown';

  setMode (mode: GeoTargetingModeType) {
    return {
      type:    GeoTargetingModeActions.SET_MODE,
      payload: {mode}
    };
  }

  toggleModeDropdown (isOpen?: boolean) {
    return {
      type:    GeoTargetingModeActions.TOGGLE_MODE_DROPDOWN,
      payload: {isOpen}
    };
  }

  constructor () {}
}
