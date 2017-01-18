import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { GeoInfoState, GEO_TARGETING_INFO_KEY } from './geo-info.reducer';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoInfoActions } from './geo-info.actions';
import { GeoState, GEO_TARGETING_STATE_KEY } from '../geo.reducer';
import { GeoIdService } from '../geo.id';
import { SharedActions } from '../../../../../shared/actions/index';

@Injectable()
export class GeoInfoService {

  getModel = (_store): Observable<GeoInfoState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geo) => {
                   let id = this.geoIdService.id$.getValue();
                   return geo[id];
                 })
                 .filter((geoState: GeoState) => Boolean(geoState))
                 .map((geoState: GeoState) => {
                   return geoState[GEO_TARGETING_INFO_KEY];
                 })
                 .distinctUntilChanged();
  };

  showInfo ({level = 'info', message, canRevert = false, revertKeys = [], isVisible = true}: GeoInfoState) {
    this._store.dispatch(this.geoInfoActions.showInfo({
      level, message, canRevert, revertKeys, isVisible
    }));
  }

  hideInfo () {
    this._store.dispatch(this.geoInfoActions.hideInfo());
  }

  /**
   * Dispatch universal revert action with revertKeys, so any interested component can process this action
   * @param revertKeys
   */
  revert (revertKeys: Array<string>) {
    this._store.dispatch(this.sharedActions.revert(revertKeys));
  }

  constructor (private _store: Store<AppState>,
               private geoInfoActions: GeoInfoActions,
               private geoIdService: GeoIdService,
               private sharedActions: SharedActions) { }

}
