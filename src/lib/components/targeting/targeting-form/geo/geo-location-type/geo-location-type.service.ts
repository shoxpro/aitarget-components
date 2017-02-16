import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeoLocationTypeState, GEO_TARGETING_LOCATION_TYPE_KEY, LocationType } from './geo-location-type.reducer';
import { GeoState, GEO_TARGETING_STATE_KEY } from '../geo.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app/reducers/index';
import { GeoLocationTypeActions } from './geo-location-type.actions';
import { GeoIdService } from '../geo.id';
import { LocationTypeValue } from '../../../interfaces/targeting-spec-geo.interface';

@Injectable()
export class GeoLocationTypeService {

  $model;

  getModel = (_store): Observable<GeoLocationTypeState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geo) => {
                   let id = this.geoIdService.id$.getValue();
                   return geo[id];
                 })
                 .filter((geoState: GeoState) => Boolean(geoState))
                 .map((geoState: GeoState) => {
                   return geoState[GEO_TARGETING_LOCATION_TYPE_KEY];
                 })
                 .distinctUntilChanged();
  }

  setTranslatedTypes () {
    this._store.dispatch(this.geoLocationTypeActions.setTranslatedTypes());
  }

  selectType (selectedType: LocationType) {
    this._store.dispatch(this.geoLocationTypeActions.selectType(selectedType));
  }

  selectTypeByValue (selectedTypeValue: LocationTypeValue[]) {
    this.$model.take(1)
        .subscribe((model) => {
          let selectedType = model.types.find((type) => type.value.toString() === selectedTypeValue.toString());
          this._store.dispatch(this.geoLocationTypeActions.selectType(selectedType));
        });
  }

  showInfoForType (type: LocationType) {
    this._store.dispatch(this.geoLocationTypeActions.showInfoForType(type));
  }

  toggleTypeDropdown (isOpen?: boolean) {
    this._store.dispatch(this.geoLocationTypeActions.toggleTypeDropdown(isOpen));
  }

  constructor (private _store: Store<AppState>,
               private geoIdService: GeoIdService,
               private geoLocationTypeActions: GeoLocationTypeActions) {
    this.$model = this._store.let(this.getModel);
  }
}
