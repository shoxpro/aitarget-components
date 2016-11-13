import { Injectable } from '@angular/core';
import { GeoTargetingInfoState } from './geo-targeting-info.reducer';
import { GeoTargetingIdService } from '../geo-targeting.id';
import { Action } from '@ngrx/store';

@Injectable()
export class GeoTargetingInfoActions {
  static SHOW_INFO = '[geo-targeting-info] Show Info';
  static HIDE_INFO = '[geo-targeting-info] Hide Info';

  showInfo (info: GeoTargetingInfoState): Action {
    return {
      type:    GeoTargetingInfoActions.SHOW_INFO,
      payload: {
        id:   this.geoTargetingIdService.id$.getValue(),
        info: info
      }
    };
  }

  hideInfo (): Action {
    return {
      type:    GeoTargetingInfoActions.HIDE_INFO,
      payload: {
        id: this.geoTargetingIdService.id$.getValue()
      }
    };
  }

  constructor (private geoTargetingIdService: GeoTargetingIdService) {}
}
