import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app/reducers/index';
import { GeoModeActions } from './geo-mode.actions';
import { GEO_TARGETING_MODE_KEY, GeoModeState, GeoModeType } from './geo-mode.reducer';
import { GeoState, GEO_TARGETING_STATE_KEY } from '../geo.reducer';
import { Observable } from 'rxjs';
import { GeoIdService } from '../geo.id';

@Injectable()
export class GeoModeService {

  getModel = (_store): Observable<GeoModeState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geo) => {
                   let id = this.geoIdService.id$.getValue();
                   return geo[id];
                 })
                 .filter((geoState: GeoState) => Boolean(geoState))
                 .map((geoState: GeoState) => {
                   return geoState[GEO_TARGETING_MODE_KEY];
                 })
                 .distinctUntilChanged();
  };

  setMode (selectedMode: GeoModeType) {
    this._store.dispatch(this.geoModeActions.setMode(selectedMode));
  }

  setTranslatedModes () {
    this._store.dispatch(this.geoModeActions.setTranslatedModes());
  }

  toggleModeDropdown (isOpen: boolean) {
    this._store.dispatch(this.geoModeActions.toggleModeDropdown(isOpen));
  }

  constructor (private _store: Store<AppState>,
               private geoIdService: GeoIdService,
               private geoModeActions: GeoModeActions) {}

}
