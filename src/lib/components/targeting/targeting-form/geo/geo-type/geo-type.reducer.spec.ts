import { geoTypeReducer, geoTypeInitial, GeoTypeState } from './geo-type.reducer';
import { GeoTypeActions } from './geo-type.actions';
import { inject, TestBed } from '@angular/core/testing';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { GeoIdService } from '../geo.id';

let deepFreeze = require('deep-freeze-strict');
const types    = [
  {id: 'all', name: `fba-geo-dropdown.all`},
  {id: 'country', name: `fba-geo-dropdown.country`},
  {id: 'country_group', name: `fba-geo-dropdown.country_group`},
  {id: 'region', name: `fba-geo-dropdown.region`},
  {id: 'geo_market', name: `fba-geo-dropdown.geo_market`},
  {id: 'city', name: `fba-geo-dropdown.city`},
  {id: 'electoral_district', name: `fba-geo-dropdown.electoral_district`},
  {id: 'political_district', name: `fba-geo-dropdown.political_district`},
  {id: 'zip', name: `fba-geo-dropdown.zip`},
  {id: 'custom_location', name: `fba-geo-dropdown.custom_location`},
  {id: 'place', name: `fba-geo-dropdown.place`}
];

describe('geoTypeReducer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      providers:    [
        GeoTypeActions,
        {provide: GeoIdService, useValue: {id$: {getValue () { return; }}}},
        {provide: TranslateService, useValue: {instant: (key) => key}}
      ],
      declarations: []
    });
  });

  describe(GeoTypeActions.TOGGLE_SEARCH_TYPE_DROPDOWN, () => {
    it('should toggle isOpen flag', inject([GeoTypeActions], (geoTypeActions) => {
      let state: GeoTypeState = Object.assign({}, geoTypeInitial, {types});

      deepFreeze(state);

      let newState = geoTypeReducer(state, geoTypeActions.toggleSearchTypeDropdown(true));

      expect(newState)
        .toEqual(Object.assign({}, state, {isOpen: true}));
    }));
  });

  describe(GeoTypeActions.SELECT_SEARCH_TYPE, () => {
    it('should select type', inject([GeoTypeActions], (geoTypeActions) => {
      let state: GeoTypeState = Object.assign({}, geoTypeInitial, {types});
      let selectType          = types[1];

      deepFreeze(state);
      let newState = geoTypeReducer(state, geoTypeActions.selectSearchType(selectType));

      expect(newState)
        .toEqual(Object.assign({}, state, {
          selectedType: selectType,
          selected:     [selectType]
        }));
    }));
  });

  describe(GeoTypeActions.SET_TRANSLATED_SEARCH_TYPES, () => {
    it('should translate names of all types based on its ids',
      inject([GeoTypeActions], (geoTypeActions) => {
        let state: GeoTypeState = Object.assign({}, geoTypeInitial);

        deepFreeze(state);

        let newState = geoTypeReducer(state, geoTypeActions.setTranslatedSearchType());

        expect(newState)
          .toEqual(Object.assign({}, geoTypeInitial, {
            types,
            selected:     types.slice(1),
            selectedType: types[0]
          }));
      }));
  });

});
