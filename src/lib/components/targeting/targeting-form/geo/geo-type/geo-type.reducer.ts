import { ActionReducer, Action } from '@ngrx/store';
import { GeoTypeActions } from './geo-type.actions';

export interface GeoType {
  id: string;
  name: string;
}

export interface GeoTypeState {
  types: Array<GeoType>;
  selectedType: GeoType | null;
  selected: Array<GeoType>;
  isOpen: boolean;
}

export const geoTypeInitial: GeoTypeState = {
  types:        [],
  selectedType: null,
  selected:     [],
  isOpen:       false
};

export const GEO_TARGETING_TYPE_KEY = 'geoType';

export const geoTypeReducer: ActionReducer<GeoTypeState> = (state = geoTypeInitial,
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
    case GeoTypeActions.SET_TRANSLATED_SEARCH_TYPES:
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
    case GeoTypeActions.TOGGLE_SEARCH_TYPE_DROPDOWN:
      isOpen = action.payload.isOpen;

      return Object.assign({}, state, {isOpen});
    case GeoTypeActions.SELECT_SEARCH_TYPE:
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
