import { ActionReducer, Action } from '@ngrx/store';
import { LocationTypeValue } from '../../targeting/interfaces/targeting-spec-geo.interface';
import { GeoTargetingLocationTypeActions } from './geo-targeting-location-type.actions';

const isEqual = require('lodash/isEqual');

export interface LocationType {
  id: string;
  name: string;
  info: string;
  showInfo: boolean;
  value: Array<LocationTypeValue>;
}

export interface GeoTargetingLocationTypeState {
  types: Array<LocationType>;
  selectedType: LocationType | null;
  isOpen: boolean;
}

export const geoTargetingLocationTypeInitial: GeoTargetingLocationTypeState = {
  types:        [],
  selectedType: null,
  isOpen:       false
};

export const GEO_TARGETING_LOCATION_TYPE_KEY = 'geoTargetingLocationType';

export const geoTargetingLocationTypeReducer: ActionReducer<GeoTargetingLocationTypeState> =
               (state = geoTargetingLocationTypeInitial, action: Action) => {
                 let types;
                 let selectedType = null;
                 let isOpen;
                 switch (action.type) {
                   case GeoTargetingLocationTypeActions.SET_TRANSLATED_TYPES:
                     types = action.payload.types;

                     if (state.selectedType) {
                       selectedType = types.find((type) => {
                         return type.id === state.selectedType.id;
                       });
                     } else {
                       selectedType = types[0];
                     }

                     return Object.assign({}, state, {types, selectedType});
                   case GeoTargetingLocationTypeActions.SELECT_TYPE:
                     selectedType = action.payload.selectedType;
                     if (isEqual(state.selectedType, selectedType)) {
                       return state;
                     }
                     return Object.assign({}, state, {selectedType});
                   case GeoTargetingLocationTypeActions.SHOW_INFO_FOR_TYPE:
                     return Object.assign({}, state, {
                       types: state.types.map((type) => {
                         return Object.assign({}, type, {
                           showInfo: type.id === action.payload.type.id
                         });
                       })
                     });
                   case GeoTargetingLocationTypeActions.TOGGLE_TYPE_DROPDOWN:
                     isOpen = action.payload.isOpen !== undefined ? action.payload.isOpen : !state.isOpen;
                     types  = state.types.map((type) => Object.assign({}, type, {showInfo: false}));
                     return Object.assign({}, state, {isOpen, types});
                   default:
                     return state;
                 }
               };
