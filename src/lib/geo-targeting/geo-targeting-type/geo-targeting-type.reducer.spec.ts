import { geoTargetingTypeReducer, geoTargetingTypeInitial } from './geo-targeting-type.reducer';
import { GeoTargetingTypeActions } from './geo-targeting-type.actions';
import { GeoTargetingTypeState } from './geo-targeting-type.interface';
import { inject, TestBed } from '@angular/core/testing';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingIdService } from '../geo-targeting.id';

let deepFreeze = require('deep-freeze');
const types    = [
  {id: 'all', name: `geo-targeting-dropdown.all`},
  {id: 'country', name: `geo-targeting-dropdown.country`},
  {id: 'region', name: `geo-targeting-dropdown.region`},
  {id: 'geo_market', name: `geo-targeting-dropdown.geo_market`},
  {id: 'city', name: `geo-targeting-dropdown.city`},
  {id: 'electoral_district', name: `geo-targeting-dropdown.electoral_district`},
  {id: 'political_district', name: `geo-targeting-dropdown.political_district`},
  {id: 'zip', name: `geo-targeting-dropdown.zip`},
  {id: 'custom_location', name: `geo-targeting-dropdown.custom_location`},
  {id: 'place', name: `geo-targeting-dropdown.place`}
];

describe('geoTargetingTypeReducer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      providers:    [
        GeoTargetingTypeActions,
        {provide: GeoTargetingIdService, useValue: {id$: {getValue () {}}}},
        {provide: TranslateService, useValue: {instant: (key) => key}}
      ],
      declarations: []
    });
  });

  describe(GeoTargetingTypeActions.TOGGLE_SEARCH_TYPE_DROPDOWN, () => {
    it('should toggle isOpen flag', inject([GeoTargetingTypeActions], (geoTargetingTypeActions) => {
      let state: GeoTargetingTypeState = Object.assign({}, geoTargetingTypeInitial, {types});

      deepFreeze(state);

      let newState = geoTargetingTypeReducer(state, geoTargetingTypeActions.toggleSearchTypeDropdown(true));

      expect(newState)
        .toEqual(Object.assign({}, state, {isOpen: true}));
    }));
  });

  describe(GeoTargetingTypeActions.SELECT_SEARCH_TYPE, () => {
    it('should select type', inject([GeoTargetingTypeActions], (geoTargetingTypeActions) => {
      let state: GeoTargetingTypeState = Object.assign({}, geoTargetingTypeInitial, {types});
      let selectType                   = types[1];

      deepFreeze(state);
      let newState = geoTargetingTypeReducer(state, geoTargetingTypeActions.selectSearchType(selectType));

      expect(newState)
        .toEqual(Object.assign({}, state, {
          selectedType: selectType,
          selected:     [selectType]
        }));
    }));
  });

  describe(GeoTargetingTypeActions.SET_TRANSLATED_SEARCH_TYPES, () => {
    it('should translate names of all types based on its ids',
      inject([GeoTargetingTypeActions], (geoTargetingTypeActions) => {
        let state: GeoTargetingTypeState = Object.assign({}, geoTargetingTypeInitial);

        deepFreeze(state);

        let newState = geoTargetingTypeReducer(state, geoTargetingTypeActions.setTranslatedSearchType());

        expect(newState)
          .toEqual(Object.assign({}, geoTargetingTypeInitial, {
            types,
            selected:     types.slice(1),
            selectedType: types[0]
          }));
      }));
  });

});
