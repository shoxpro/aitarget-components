import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/index';
import { GeoTargetingModeActions } from './geo-targeting-mode.actions';
import { GEO_TARGETING_MODE_KEY, GeoTargetingModeState, GeoTargetingModeType } from './geo-targeting-mode.reducer';
import { GeoTargetingState, GEO_TARGETING_STATE_KEY } from '../geo-targeting.interface';
import { Observable } from 'rxjs';

@Injectable()
export class GeoTargetingModeService {

  static getModel (_store): Observable<GeoTargetingModeState> {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_MODE_KEY])
                 .distinctUntilChanged();
  };

  setMode (selectedMode: GeoTargetingModeType) {
    this._store.dispatch(this.geoTargetingModeActions.setMode(selectedMode));
  }

  setTranslatedModes () {
    this._store.dispatch(this.geoTargetingModeActions.setTranslatedModes());
  }

  toggleModeDropdown (isOpen: boolean) {
    this._store.dispatch(this.geoTargetingModeActions.toggleModeDropdown(isOpen));
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingModeActions: GeoTargetingModeActions) {}

}
