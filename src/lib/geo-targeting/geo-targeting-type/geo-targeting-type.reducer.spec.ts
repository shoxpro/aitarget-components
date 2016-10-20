import { geoTargetingTypeReducer } from './geo-targeting-type.reducer';
import { TOGGLE_SEARCH_TYPE_DROPDOWN, SELECT_SEARCH_TYPE, TRANSLATE_SEARCH_TYPES } from './geo-targeting-type.actions';
import { GeoTargetingTypeState } from './geo-targeting-type.interface';
import { geoTargetingTypeInitial } from './geo-targeting-type.initial';

let deepFreeze = require('deep-freeze');

describe('Reducer: geoTargetingType', () => {
  it('should return initial state if no state passed', () => {
    let state     = undefined;
    let nextState = geoTargetingTypeReducer(state, {type: ''});

    expect(nextState)
      .toEqual(geoTargetingTypeInitial);
  });

  it('should toggle isOpen flag', () => {
    let state: GeoTargetingTypeState = geoTargetingTypeInitial;
    let newState                     = Object.assign({}, state, {isOpen: true});

    deepFreeze(state);

    let nextState = geoTargetingTypeReducer(state, {type: TOGGLE_SEARCH_TYPE_DROPDOWN, payload: {isOpen: true}});

    expect(nextState)
      .toEqual(newState);
  });

  it('should select type', () => {
    let state: GeoTargetingTypeState = geoTargetingTypeInitial;
    let selectType                   = {id: 'country', name: 'country'};
    let newState                     = Object.assign({}, state, <GeoTargetingTypeState>{
      selectedType: selectType,
      selected:     [selectType]
    });

    deepFreeze(state);

    let nextState = geoTargetingTypeReducer(state, {type: SELECT_SEARCH_TYPE, payload: {selectedType: selectType}});

    expect(nextState)
      .toEqual(newState);
  });

  it('should translate names of all types based on its ids', () => {
    let state: GeoTargetingTypeState = geoTargetingTypeInitial;
    const translatedName             = 'translated name';
    let newState                     = Object.assign({}, state, <GeoTargetingTypeState>{
      available:    state.available.map((type) => Object.assign({}, type, {name: translatedName})),
      selected:     state.selected.map((type) => Object.assign({}, type, {name: translatedName})),
      selectedType: Object.assign({}, state.selectedType, {name: translatedName}),
    });
    let translateService             = {instant: () => translatedName};

    deepFreeze(state);

    let nextState = geoTargetingTypeReducer(state, {
      type:    TRANSLATE_SEARCH_TYPES,
      payload: {translateService: translateService}
    });

    expect(nextState)
      .toEqual(newState);
  });
});
