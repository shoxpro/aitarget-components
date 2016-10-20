import { ActionReducer } from '@ngrx/store';
import { SELECT_SEARCH_TYPE, TOGGLE_SEARCH_TYPE_DROPDOWN, TRANSLATE_SEARCH_TYPES } from './geo-targeting-type.actions';
import { GeoTargetingTypeState } from './geo-targeting-type.interface';
import { GeoTargetingTypeInitial } from './geo-targeting-type.initial';

export const geoTargetingTypeReducer: ActionReducer<GeoTargetingTypeState> = (state = GeoTargetingTypeInitial, {type, payload}) => {
  switch (type) {
    case TOGGLE_SEARCH_TYPE_DROPDOWN:
      return Object.assign({}, state, {isOpen: payload.isOpen});

    case SELECT_SEARCH_TYPE:
      let selectedType = payload.selectedType;

      return Object.assign({}, state, <GeoTargetingTypeState>{
        selectedType: selectedType,
        selected:     state.available.filter((type) => {
          return selectedType.id === 'all' ? type.id !== selectedType.id : type.id === selectedType.id;
        })
      });

    case TRANSLATE_SEARCH_TYPES:
      const translateService = payload.translateService;
      const translateType    = (geoType) => {
        return Object.assign({}, geoType, {
          name: translateService.instant(`geo-targeting-dropdown.${geoType.id}`)
        });
      };

      return Object.assign({}, state, <GeoTargetingTypeState>{
        selectedType: translateType(state.selectedType),
        selected:     state.selected.map((geoType) => {
          return translateType(geoType);
        }),
        available:    state.available.map((geoType) => {
          return translateType(geoType);
        })
      });

    default:
      return state;
  }
};
