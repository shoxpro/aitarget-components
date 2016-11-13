import { ActionReducer, Action } from '@ngrx/store';
import { GeoTargetingTypeActions } from './geo-targeting-type.actions';

export interface GeoTargetingType {
  id: string;
  name: string;
}

export interface GeoTargetingTypeState {
  types: Array<GeoTargetingType>;
  selectedType: GeoTargetingType | null;
  selected: Array<GeoTargetingType>;
  isOpen: boolean;
}

export const geoTargetingTypeInitial: GeoTargetingTypeState = {
  types:        [],
  selectedType: null,
  selected:     [],
  isOpen:       false
};

export const GEO_TARGETING_TYPE_KEY = 'geoTargetingType';

export const geoTargetingTypeReducer: ActionReducer<GeoTargetingTypeState> = (state = geoTargetingTypeInitial,
                                                                              action: Action) => {
  let types;
  let selectedType;
  let selected;
  let isOpen;

  const setDefaults = (availableTypes) => {
    selectedType = availableTypes[0];
    selected     = availableTypes.slice(1);
  };

  switch (action.type) {
    case GeoTargetingTypeActions.SET_TRANSLATED_SEARCH_TYPES:
      types = action.payload.types;

      if (state.selectedType === null || state.selectedType.id === 'all') {
        setDefaults(types);
      } else {
        selectedType = types.find((type) => {
          return type.id === state.selectedType.id;
        });
        selected     = [selectedType];
      }

      return Object.assign({}, state, {types, selectedType, selected});
    case GeoTargetingTypeActions.TOGGLE_SEARCH_TYPE_DROPDOWN:
      isOpen = action.payload.isOpen;

      return Object.assign({}, state, {isOpen});
    case GeoTargetingTypeActions.SELECT_SEARCH_TYPE:
      selectedType = action.payload.selectedType;
      if (selectedType.id === 'all') {
        setDefaults([...state.types]);
      } else {
        selectedType = state.types.find((type) => {
          return type.id === selectedType.id;
        });
        selected     = [selectedType];
      }

      return Object.assign({}, state, {selectedType, selected});
    default:
      return state;
  }
};
