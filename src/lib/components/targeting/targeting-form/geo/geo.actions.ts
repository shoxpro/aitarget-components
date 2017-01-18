import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { GeoIdService } from './geo.id';

@Injectable()
export class GeoActions {
  static GEO_TARGETING_INIT    = '[geo] Init';
  static GEO_TARGETING_DESTROY = '[geo] Destroy';

  init (): Action {
    return {
      type:    GeoActions.GEO_TARGETING_INIT,
      payload: {id: this.geoIdService.id$.getValue()}
    };
  }

  destroy (): Action {
    return {
      type:    GeoActions.GEO_TARGETING_DESTROY,
      payload: {id: this.geoIdService.id$.getValue()}
    };
  }

  constructor (private geoIdService: GeoIdService) {}

}
