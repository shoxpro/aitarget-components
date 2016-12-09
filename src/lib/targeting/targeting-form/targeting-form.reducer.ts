import { DetailedTargetingSpec } from '../interfaces/targeting-spec-detailed.interface';
import { GeoTargetingSpec, geoTargetingSpecInitial } from '../interfaces/targeting-spec-geo.interface';
import { Action, ActionReducer } from '@ngrx/store';
import { TargetingFormActions } from './targeting-form.actions';
import { GendersSpec } from '../interfaces/targeting-spec-gender.interface';

export interface TargetingFormState {
  geoTargetings: Array<{geo_locations: GeoTargetingSpec; excluded_geo_locations?: GeoTargetingSpec}>;
  detailedTargetings: Array<DetailedTargetingSpec>;
  genders: Array<GendersSpec>;
}

export const targetingFormInitial: TargetingFormState = {
  geoTargetings:      [{
    geo_locations: geoTargetingSpecInitial
  }],
  detailedTargetings: [{}],
  genders:            [{}]
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
