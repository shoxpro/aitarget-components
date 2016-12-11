import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { GeoTargetingIdService } from './geo-targeting.id';

@Injectable()
export class GeoTargetingActions {
  static GEO_TARGETING_INIT    = '[geo-targeting] Init';
  static GEO_TARGETING_DESTROY = '[geo-targeting] Destroy';

  init (): Action {
    return {
      type:    GeoTargetingActions.GEO_TARGETING_INIT,
      payload: {id: this.geoTargetingIdService.id$.getValue()}
    };
  }

  destroy (): Action {
    return {
      type:    GeoTargetingActions.GEO_TARGETING_DESTROY,
      payload: {id: this.geoTargetingIdService.id$.getValue()}
    };
  }

  constructor (private geoTargetingIdService: GeoTargetingIdService) {}

}
