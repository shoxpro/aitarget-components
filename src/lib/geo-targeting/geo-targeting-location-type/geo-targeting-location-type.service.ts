import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  GeoTargetingLocationTypeState, GEO_TARGETING_LOCATION_TYPE, LocationType
} from './geo-targeting-location-type.reducer';
import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/index';
import { GeoTargetingLocationTypeActions } from './geo-targeting-location-type.actions';
import { LocationTypeValue } from '../../targeting/targeting-spec-geo.interface';

@Injectable()
export class GeoTargetingLocationTypeService {

  $model;

  static getModel = (_store): Observable<GeoTargetingLocationTypeState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_LOCATION_TYPE])
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
               private geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) {
    this.$model = this._store.let(GeoTargetingLocationTypeService.getModel);
  }
}
