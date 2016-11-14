import { Injectable } from '@angular/core';
import { GeoTargetingTypeState, GEO_TARGETING_TYPE_KEY, GeoTargetingType } from './geo-targeting-type.reducer';
import { Observable } from 'rxjs';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingTypeActions } from './geo-targeting-type.actions';
import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.reducer';
import { GeoTargetingIdService } from '../geo-targeting.id';

@Injectable()
export class GeoTargetingTypeService {
  getModel = (_store): Observable<GeoTargetingTypeState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargeting) => {
                   let id = this.geoTargetingIdService.id$.getValue();
                   return geoTargeting[id];
                 })
                 .filter((geoTargetingState: GeoTargetingState) => Boolean(geoTargetingState))
                 .map((geoTargetingState: GeoTargetingState) => {
                   return geoTargetingState[GEO_TARGETING_TYPE_KEY];
                 })
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
               private geoTargetingIdService: GeoTargetingIdService,
               private geoTargetingTypeActions: GeoTargetingTypeActions) {}
}
