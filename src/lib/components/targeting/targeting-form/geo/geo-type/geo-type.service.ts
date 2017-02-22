import { Injectable } from '@angular/core';
import { GeoTypeState, GEO_TARGETING_TYPE_KEY, GeoType } from './geo-type.reducer';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { GeoTypeActions } from './geo-type.actions';
import { GEO_TARGETING_STATE_KEY, GeoState } from '../geo.reducer';
import { GeoIdService } from '../geo.id';
import { AppState } from '../../../../../../app/reducers/index';

@Injectable()
export class GeoTypeService {
  getModel = (_store): Observable<GeoTypeState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geo) => {
                   let id = this.geoIdService.id$.getValue();
                   return geo[id];
                 })
                 .filter((geoState: GeoState) => Boolean(geoState))
                 .map((geoState: GeoState) => {
                   return geoState[GEO_TARGETING_TYPE_KEY];
                 })
                 .distinctUntilChanged();
  }

  setTranslatedSearchType () {
    this._store.dispatch(this.geoTypeActions.setTranslatedSearchType());
  }

  selectSearchType (selectedType: GeoType) {
    this._store.dispatch(this.geoTypeActions.selectSearchType(selectedType));
  }

  toggleSearchTypeDropdown (isOpen: boolean) {
    this._store.dispatch(this.geoTypeActions.toggleSearchTypeDropdown(isOpen));
  }

  constructor (private _store: Store<AppState>,
               private geoIdService: GeoIdService,
               private geoTypeActions: GeoTypeActions) {}
}
