import { DetailedSpec, detailedTargetingSpecInitial } from '../interfaces/targeting-spec-detailed.interface';
import { GeoSpec, geoSpecInitial } from '../interfaces/targeting-spec-geo.interface';
import { Action, ActionReducer } from '@ngrx/store';
import { TargetingFormActions } from './targeting-form.actions';
import { GendersSpec } from '../interfaces/targeting-spec-gender.interface';
import { AgeSpec, ageInitial } from '../interfaces/targeting-spec-age.interface';
import { LocalesSpec } from '../interfaces/targeting-spec-locales.interface';

export interface TargetingFormState {
  geoLocations: Array<{geo_locations: GeoSpec; excluded_geo_locations?: GeoSpec}>;
  detailedTargetings: Array<DetailedSpec>;
  genders: Array<GendersSpec>;
  ages: Array<AgeSpec>;
  locales: Array<LocalesSpec>;
}

export const targetingFormInitial: TargetingFormState = {
  geoLocations:       [{
    geo_locations: geoSpecInitial
  }],
  detailedTargetings: [detailedTargetingSpecInitial],
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
