import { DetailedTargetingSpec } from '../interfaces/targeting-spec-detailed.interface';
import { GeoTargetingSpec, geoTargetingSpecInitial } from '../interfaces/targeting-spec-geo.interface';
import { Action, ActionReducer } from '@ngrx/store';
import { TargetingFormActions } from './targeting-form.actions';
import { GendersSpec } from '../interfaces/targeting-spec-gender.interface';
import { AgeSpec, ageInitial } from '../interfaces/targeting-spec-age.interface';
import { LocalesSpec } from '../interfaces/targeting-spec-locales.interface';

export interface TargetingFormState {
  geoTargetings: Array<{geo_locations: GeoTargetingSpec; excluded_geo_locations?: GeoTargetingSpec}>;
  detailedTargetings: Array<DetailedTargetingSpec>;
  genders: Array<GendersSpec>;
  ages: Array<AgeSpec>;
  locales: Array<LocalesSpec>;
}

export const targetingFormInitial: TargetingFormState = {
  geoTargetings:      [{
    geo_locations: geoTargetingSpecInitial
  }],
  detailedTargetings: [{}],
  genders:            [{}],
  ages:               [ageInitial],
  locales:            [{}]
};

export const TARGETING_FORM_KEY = 'formValue';

export const targetingFormReducer: ActionReducer<TargetingFormState> = (state = targetingFormInitial,
                                                                        action: Action) => {
  switch (action.type) {
    case TargetingFormActions.SET_FORM_VALUE:
      return Object.assign({}, state, action.payload.formValue);
    default:
      return state;
  }
};
