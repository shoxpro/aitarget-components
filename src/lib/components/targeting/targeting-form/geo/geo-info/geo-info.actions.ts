import { Injectable } from '@angular/core';
import { GeoInfoState } from './geo-info.reducer';
import { GeoIdService } from '../geo.id';
import { Action } from '@ngrx/store';

@Injectable()
export class GeoInfoActions {
  static SHOW_INFO = '[geo-info] Show Info';
  static HIDE_INFO = '[geo-info] Hide Info';

  showInfo (info: GeoInfoState): Action {
    return {
      type:    GeoInfoActions.SHOW_INFO,
      payload: {
        id:   this.geoIdService.id$.getValue(),
        info: info
      }
    };
  }

  hideInfo (): Action {
    return {
      type:    GeoInfoActions.HIDE_INFO,
      payload: {
        id: this.geoIdService.id$.getValue()
      }
    };
  }

  constructor (private geoIdService: GeoIdService) {}
}
