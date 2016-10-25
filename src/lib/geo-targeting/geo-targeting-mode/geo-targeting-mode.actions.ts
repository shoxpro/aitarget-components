import { Injectable } from '@angular/core';
import { GeoTargetingModeType } from './geo-targeting-mode.reducer';

@Injectable()
export class GeoTargetingModeActions {

  static SET_MODE = '[geo-targeting-mode] Set Mode';

  setMode (mode: GeoTargetingModeType) {
    return {
      type:    GeoTargetingModeActions.SET_MODE,
      payload: {mode}
    };
  }

  constructor () {}
}
