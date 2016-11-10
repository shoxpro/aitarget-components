import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { GeoTargetingInfoState, GEO_TARGETING_INFO_KEY } from './geo-targeting-info.reducer';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingInfoActions } from './geo-targeting-info.actions';
import { GeoTargetingState, GEO_TARGETING_STATE_KEY } from '../geo-targeting.reducer';
import { SharedActions } from '../../shared/actions/index';

@Injectable()
export class GeoTargetingInfoService {

  static getModel (_store): Observable<GeoTargetingInfoState> {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_INFO_KEY])
                 .distinctUntilChanged();
  };

  showInfo ({level = 'info', message, canRevert = false, revertKeys = [], isVisible = true}: GeoTargetingInfoState) {
    this._store.dispatch(this.geoTargetingInfoActions.showInfo({
      level, message, canRevert, revertKeys, isVisible
    }));
  }

  hideInfo () {
    this._store.dispatch(this.geoTargetingInfoActions.hideInfo());
  }

  /**
   * Dispatch universal revert action with revertKeys, so any interested component can process this action
   * @param revertKeys
   */
  revert (revertKeys: Array<string>) {
    this._store.dispatch(this.sharedActions.revert(revertKeys));
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingInfoActions: GeoTargetingInfoActions,
               private sharedActions: SharedActions) { }

}
