import { Action, ActionReducer } from '@ngrx/store';
import { SELECT_SEARCH_TYPE, TOGGLE_SEARCH_TYPE_DROPDOWN, TRANSLATE_SEARCH_TYPES } from './geo-targeting-type.actions';
import { GeoTargetingTypeState } from './geo-targeting-type.interface';
import { GeoTargetingTypeInitial } from './geo-targeting-type.initial';

export const geoTargetingTypeReducer: ActionReducer<GeoTargetingTypeState> = (state = GeoTargetingTypeInitial, action: Action) => {
  switch (action.type) {
    case TOGGLE_SEARCH_TYPE_DROPDOWN:
      return Object.assign({}, state, {isOpen: action.payload.isOpen});

    case SELECT_SEARCH_TYPE:
      let selectedType = action.payload.selectedType;

      return Object.assign({}, state, <GeoTargetingTypeState>{
        selectedType: selectedType,
        selected:     state.available.filter((type) => {
          return selectedType.id === 'all' ? type.id !== selectedType.id : type.id === selectedType.id;
        })
      });

    case TRANSLATE_SEARCH_TYPES:
      const translateService = action.payload.translateService;
      const translateType    = (type) => {
        return Object.assign({}, type, {
          name: translateService.instant(`geo-targeting-dropdown.${type.id}`)
        });
      };

      return Object.assign({}, state, <GeoTargetingTypeState>{
        selectedType: translateType(state.selectedType),
        selected:     state.selected.map((type) => {
          return translateType(type);
        }),
        available:    state.available.map((type) => {
          return translateType(type);
        })
      });

    default:
      return state;
  }
};
