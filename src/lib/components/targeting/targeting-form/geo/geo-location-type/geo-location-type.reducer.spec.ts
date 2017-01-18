import { TestBed, inject } from '@angular/core/testing';
import { GeoLocationTypeActions } from './geo-location-type.actions';
import { geoLocationTypeInitial, geoLocationTypeReducer, LocationType } from './geo-location-type.reducer';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoIdService } from '../geo.id';

let deepFreeze = require('deep-freeze');

let typesWithKeys: Array<LocationType> = [
  {
    id:       'all',
    name:     `fba-geo-location-type.ALL`,
    info:     `fba-geo-location-type.ALL_INFO`,
    showInfo: false,
    value:    ['home', 'recent']
  },
  {
    id:       'home',
    name:     `fba-geo-location-type.HOME`,
    info:     `fba-geo-location-type.HOME_INFO`,
    showInfo: false,
    value:    ['home']
  },
  {
    id:       'recent',
    name:     `fba-geo-location-type.RECENT`,
    info:     `fba-geo-location-type.RECENT_INFO`,
    showInfo: false,
    value:    ['recent']
  },
  {
    id:       'travel_in',
    name:     `fba-geo-location-type.TRAVEL_IN`,
    info:     `fba-geo-location-type.TRAVEL_IN_INFO`,
    showInfo: false,
    value:    ['travel_in']
  },
];

describe(`geoLocationTypeReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoLocationTypeActions,
        {provide: GeoIdService, useValue: {id$: {getValue () {}}}},
        {provide: TranslateService, useValue: {instant: (key) => key}}
      ]
    });
  });

  describe(GeoLocationTypeActions.SET_TRANSLATED_TYPES, () => {
    it(`should set translated list of types`, inject([GeoLocationTypeActions],
      (geoLocationTypeActions: GeoLocationTypeActions) => {
        let state = geoLocationTypeInitial;

        deepFreeze(state);

        let newState = geoLocationTypeReducer(state, geoLocationTypeActions.setTranslatedTypes());

        expect(newState.types)
          .toEqual(typesWithKeys);
      })
    );

    it(`should translate selected type`, inject([GeoLocationTypeActions],
      (geoLocationTypeActions: GeoLocationTypeActions) => {
        // Set selected type and reset its name and info
        let state = Object.assign({}, geoLocationTypeInitial, {
          selectedType: Object.assign({}, typesWithKeys[2], {name: '', info: ''})
        });

        deepFreeze(state);

        let newState = geoLocationTypeReducer(state, geoLocationTypeActions.setTranslatedTypes());

        expect(newState.selectedType)
          .toEqual(typesWithKeys[2], 'should be selected type with index 2 and name and info restored');
      })
    );

    it(`should set selected type to default if it is null`, inject([GeoLocationTypeActions],
      (geoLocationTypeActions: GeoLocationTypeActions) => {
        // Set selected type and reset its name and info
        let state = geoLocationTypeInitial;

        deepFreeze(state);

        let newState = geoLocationTypeReducer(state, geoLocationTypeActions.setTranslatedTypes());

        expect(newState.selectedType)
          .toEqual(typesWithKeys[0], 'should set selected type to be default type with index 0');
      })
    );
  });

  describe(GeoLocationTypeActions.SELECT_TYPE, () => {
    it(`should select type`, inject([GeoLocationTypeActions],
      (geoLocationTypeActions: GeoLocationTypeActions) => {
        let state = geoLocationTypeInitial;

        deepFreeze(state);

        let newState = geoLocationTypeReducer(state,
          geoLocationTypeActions.selectType(typesWithKeys[2]));

        expect(newState.selectedType)
          .toEqual(typesWithKeys[2]);
      })
    );
  });

  describe(GeoLocationTypeActions.SHOW_INFO_FOR_TYPE, () => {
    it(`should show info for type`, inject([GeoLocationTypeActions],
      (geoLocationTypeActions: GeoLocationTypeActions) => {
        let state = geoLocationTypeInitial;

        deepFreeze(state);

        // Fill in types
        let newState = geoLocationTypeReducer(state, geoLocationTypeActions.setTranslatedTypes());
        // Show info for second type
        newState     = geoLocationTypeReducer(newState,
          geoLocationTypeActions.showInfoForType(typesWithKeys[2]));
        // Show info for third type
        newState     = geoLocationTypeReducer(newState,
          geoLocationTypeActions.showInfoForType(typesWithKeys[3]));

        let typesWithInfo = newState.types.filter((type) => type.showInfo);

        expect(typesWithInfo.length)
          .toEqual(1, 'should have only exactly one type with active info');

        expect(typesWithInfo[0].id)
          .toEqual(typesWithKeys[3].id, 'type with active info should be with index 3');
      })
    );
  });

  describe(GeoLocationTypeActions.TOGGLE_TYPE_DROPDOWN, () => {
    it(`should change isOpen flag if passed no arguments`, inject([GeoLocationTypeActions],
      (geoLocationTypeActions: GeoLocationTypeActions) => {
        let state = geoLocationTypeInitial;

        deepFreeze(state);

        let newState = geoLocationTypeReducer(state,
          geoLocationTypeActions.toggleTypeDropdown());

        expect(newState.isOpen)
          .toEqual(true);

        newState = geoLocationTypeReducer(newState,
          geoLocationTypeActions.toggleTypeDropdown());

        expect(newState.isOpen)
          .toEqual(false);
      })
    );

    it(`should set isOpen flag to argument passed`, inject([GeoLocationTypeActions],
      (geoLocationTypeActions: GeoLocationTypeActions) => {
        let state = Object.assign({}, geoLocationTypeInitial, {
          isOpen: 'false' // it can't be string, but we set it as string to check it would be changed to boolean
        });

        deepFreeze(state);

        let newState = geoLocationTypeReducer(state,
          geoLocationTypeActions.toggleTypeDropdown(true));

        expect(newState.isOpen)
          .toEqual(true);

        newState = geoLocationTypeReducer(newState,
          geoLocationTypeActions.toggleTypeDropdown(false));

        expect(newState.isOpen)
          .toEqual(false);
      })
    );

    it(`should hide all info for all types`, inject([GeoLocationTypeActions],
      (geoLocationTypeActions: GeoLocationTypeActions) => {
        let state = geoLocationTypeInitial;

        deepFreeze(state);

        // Fill in types
        let newState = geoLocationTypeReducer(state, geoLocationTypeActions.setTranslatedTypes());
        // Show info for second type
        newState     = geoLocationTypeReducer(newState,
          geoLocationTypeActions.showInfoForType(typesWithKeys[2]));
        // Toggle dropdown
        newState     = geoLocationTypeReducer(newState,
          geoLocationTypeActions.toggleTypeDropdown(true));

        let typesWithInfo = newState.types.filter((type) => type.showInfo);

        expect(typesWithInfo.length)
          .toEqual(0, 'should have no types with active info');
      })
    );
  });
});
