import { ActionReducer, Action } from '@ngrx/store';
import { GeoLocationTypeActions } from './geo-location-type.actions';
import { LocationTypeValue } from '../../../interfaces/targeting-spec-geo.interface';

const isEqual = require('lodash/isEqual');

export interface LocationType {
  id: string;
  name: string;
  info: string;
  showInfo: boolean;
  value: Array<LocationTypeValue>;
}

export interface GeoLocationTypeState {
  types: Array<LocationType>;
  selectedType: LocationType | null;
  isOpen: boolean;
}

export const geoLocationTypeInitial: GeoLocationTypeState = {
  types:        [],
  selectedType: null,
  isOpen:       false
};

export const GEO_TARGETING_LOCATION_TYPE_KEY = 'geoLocationType';

export const geoLocationTypeReducer: ActionReducer<GeoLocationTypeState> =
               (state = geoLocationTypeInitial, action: Action) => {
                 let types;
                 let selectedType = null;
                 let isOpen;
                 switch (action.type) {
                   case GeoLocationTypeActions.SET_TRANSLATED_TYPES:
                     types = action.payload.types;

                     if (state.selectedType) {
                       selectedType = types.find((type) => {
                         return type.id === state.selectedType.id;
                       });
                     } else {
                       selectedType = types[0];
                     }

                     return Object.assign({}, state, {types, selectedType});
                   case GeoLocationTypeActions.SELECT_TYPE:
                     selectedType = action.payload.selectedType;
                     if (isEqual(state.selectedType, selectedType)) {
                       return state;
                     }
                     return Object.assign({}, state, {selectedType});
                   case GeoLocationTypeActions.SHOW_INFO_FOR_TYPE:
                     return Object.assign({}, state, {
                       types: state.types.map((type) => {
                         return Object.assign({}, type, {
                           showInfo: type.id === action.payload.type.id
                         });
                       })
                     });
                   case GeoLocationTypeActions.TOGGLE_TYPE_DROPDOWN:
                     isOpen = action.payload.isOpen !== undefined ? action.payload.isOpen : !state.isOpen;
                     types  = state.types.map((type) => Object.assign({}, type, {showInfo: false}));
                     return Object.assign({}, state, {isOpen, types});
                   default:
                     return state;
                 }
               };
