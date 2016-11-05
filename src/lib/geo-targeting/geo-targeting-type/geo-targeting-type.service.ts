import { Injectable } from '@angular/core';
import { GeoTargetingTypeState, GEO_TARGETING_TYPE_STATE_KEY, GeoTargetingType } from './geo-targeting-type.reducer';
import { Observable } from 'rxjs';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingTypeActions } from './geo-targeting-type.actions';
import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.reducer';

@Injectable()
export class GeoTargetingTypeService {
  static getModel (_store): Observable<GeoTargetingTypeState> {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_TYPE_STATE_KEY])
                 .distinctUntilChanged();
  };

  setTranslatedSearchType () {
    this._store.dispatch(this.geoTargetingTypeActions.setTranslatedSearchType());
  }

  selectSearchType (selectedType: GeoTargetingType) {
    this._store.dispatch(this.geoTargetingTypeActions.selectSearchType(selectedType));
  }

  toggleSearchTypeDropdown (isOpen: boolean) {
    this._store.dispatch(this.geoTargetingTypeActions.toggleSearchTypeDropdown(isOpen));
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingTypeActions: GeoTargetingTypeActions) {}
}
