import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { GeoTargetingInfoState, GEO_TARGETING_INFO_KEY } from './geo-targeting-info.reducer';
import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.interface';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingInfoActions } from './geo-targeting-info.actions';

@Injectable()
export class GeoTargetingInfoService {

  static getModel = (_store): Observable<GeoTargetingInfoState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_INFO_KEY])
                 .distinctUntilChanged();
  };

  showInfo ({level, message, canRevert = false, isVisible = true}) {
    this._store.dispatch(this.geoTargetingInfoActions.showInfo({
      level, message, canRevert, isVisible
    }));
  }

  hideInfo () {
    this._store.dispatch(this.geoTargetingInfoActions.hideInfo());
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingInfoActions: GeoTargetingInfoActions) { }

}
