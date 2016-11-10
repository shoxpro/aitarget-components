import { Injectable } from '@angular/core';
import { GeoTargetingInfoState } from './geo-targeting-info.reducer';

@Injectable()
export class GeoTargetingInfoActions {
  static SHOW_INFO = '[geo-targeting-info] Show Info';
  static HIDE_INFO = '[geo-targeting-info] Hide Info';

  showInfo (info: GeoTargetingInfoState) {
    return {
      type:    GeoTargetingInfoActions.SHOW_INFO,
      payload: info
    };
  }

  hideInfo () {
    return {
      type: GeoTargetingInfoActions.HIDE_INFO
    };
  }

  constructor () {}
}
