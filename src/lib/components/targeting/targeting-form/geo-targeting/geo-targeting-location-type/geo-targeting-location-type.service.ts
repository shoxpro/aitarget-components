import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  GeoTargetingLocationTypeState, GEO_TARGETING_LOCATION_TYPE_KEY, LocationType
} from './geo-targeting-location-type.reducer';
import { GeoTargetingState, GEO_TARGETING_STATE_KEY } from '../geo-targeting.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app/reducers/index';
import { GeoTargetingLocationTypeActions } from './geo-targeting-location-type.actions';
import { GeoTargetingIdService } from '../geo-targeting.id';
import { LocationTypeValue } from '../../../interfaces/targeting-spec-geo.interface';

@Injectable()
export class GeoTargetingLocationTypeService {

  $model;

  getModel = (_store): Observable<GeoTargetingLocationTypeState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargeting) => {
                   let id = this.geoTargetingIdService.id$.getValue();
                   return geoTargeting[id];
                 })
                 .filter((geoTargetingState: GeoTargetingState) => Boolean(geoTargetingState))
                 .map((geoTargetingState: GeoTargetingState) => {
                   return geoTargetingState[GEO_TARGETING_LOCATION_TYPE_KEY];
                 })
                 .distinctUntilChanged();
  };

  setTranslatedTypes () {
    this._store.dispatch(this.geoTargetingLocationTypeActions.setTranslatedTypes());
  }

  selectType (selectedType: LocationType) {
    this._store.dispatch(this.geoTargetingLocationTypeActions.selectType(selectedType));
  }

  selectTypeByValue (selectedTypeValue: LocationTypeValue[]) {
    this.$model.take(1)
        .subscribe((model) => {
          let selectedType = model.types.find((type) => type.value.toString() === selectedTypeValue.toString());
          this._store.dispatch(this.geoTargetingLocationTypeActions.selectType(selectedType));
        });
  }

  showInfoForType (type: LocationType) {
    this._store.dispatch(this.geoTargetingLocationTypeActions.showInfoForType(type));
  }

  toggleTypeDropdown (isOpen?: boolean) {
    this._store.dispatch(this.geoTargetingLocationTypeActions.toggleTypeDropdown(isOpen));
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingIdService: GeoTargetingIdService,
               private geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) {
    this.$model = this._store.let(this.getModel);
  }
}
