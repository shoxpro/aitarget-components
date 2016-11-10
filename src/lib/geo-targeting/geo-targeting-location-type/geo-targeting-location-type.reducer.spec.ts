import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingLocationTypeActions } from './geo-targeting-location-type.actions';
import {
  geoTargetingLocationTypeInitial, geoTargetingLocationTypeReducer, LocationType
} from './geo-targeting-location-type.reducer';
import { TranslateService } from 'ng2-translate/ng2-translate';

let deepFreeze = require('deep-freeze');

let typesWithKeys: Array<LocationType> = [
  {
    id:       'all',
    name:     `geo-targeting-location-type.ALL`,
    info:     `geo-targeting-location-type.ALL_INFO`,
    showInfo: false,
    value:    ['home', 'recent']
  },
  {
    id:       'home',
    name:     `geo-targeting-location-type.HOME`,
    info:     `geo-targeting-location-type.HOME_INFO`,
    showInfo: false,
    value:    ['home']
  },
  {
    id:       'recent',
    name:     `geo-targeting-location-type.RECENT`,
    info:     `geo-targeting-location-type.RECENT_INFO`,
    showInfo: false,
    value:    ['recent']
  },
  {
    id:       'travel_in',
    name:     `geo-targeting-location-type.TRAVEL_IN`,
    info:     `geo-targeting-location-type.TRAVEL_IN_INFO`,
    showInfo: false,
    value:    ['travel_in']
  },
];

describe(`geoTargetingLocationTypeReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoTargetingLocationTypeActions,
        {provide: TranslateService, useValue: {instant: (key) => key}}
      ]
    });
  });

  describe(GeoTargetingLocationTypeActions.SET_TRANSLATED_TYPES, () => {
    it(`should set translated list of types`, inject([GeoTargetingLocationTypeActions],
      (geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) => {
        let state = geoTargetingLocationTypeInitial;

        deepFreeze(state);

        let newState = geoTargetingLocationTypeReducer(state, geoTargetingLocationTypeActions.setTranslatedTypes());

        expect(newState.types)
          .toEqual(typesWithKeys);
      })
    );

    it(`should translate selected type`, inject([GeoTargetingLocationTypeActions],
      (geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) => {
        // Set selected type and reset its name and info
        let state = Object.assign({}, geoTargetingLocationTypeInitial, {
          selectedType: Object.assign({}, typesWithKeys[2], {name: '', info: ''})
        });

        deepFreeze(state);

        let newState = geoTargetingLocationTypeReducer(state, geoTargetingLocationTypeActions.setTranslatedTypes());

        expect(newState.selectedType)
          .toEqual(typesWithKeys[2], 'should be selected type with index 2 and name and info restored');
      })
    );

    it(`should set selected type to default if it is null`, inject([GeoTargetingLocationTypeActions],
      (geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) => {
        // Set selected type and reset its name and info
        let state = geoTargetingLocationTypeInitial;

        deepFreeze(state);

        let newState = geoTargetingLocationTypeReducer(state, geoTargetingLocationTypeActions.setTranslatedTypes());

        expect(newState.selectedType)
          .toEqual(typesWithKeys[0], 'should set selected type to be default type with index 0');
      })
    );
  });

  describe(GeoTargetingLocationTypeActions.SELECT_TYPE, () => {
    it(`should select type`, inject([GeoTargetingLocationTypeActions],
      (geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) => {
        let state = geoTargetingLocationTypeInitial;

        deepFreeze(state);

        let newState = geoTargetingLocationTypeReducer(state,
          geoTargetingLocationTypeActions.selectType(typesWithKeys[2]));

        expect(newState.selectedType)
          .toEqual(typesWithKeys[2]);
      })
    );
  });

  describe(GeoTargetingLocationTypeActions.SHOW_INFO_FOR_TYPE, () => {
    it(`should show info for type`, inject([GeoTargetingLocationTypeActions],
      (geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) => {
        let state = geoTargetingLocationTypeInitial;

        deepFreeze(state);

        // Fill in types
        let newState = geoTargetingLocationTypeReducer(state, geoTargetingLocationTypeActions.setTranslatedTypes());
        // Show info for second type
        newState     = geoTargetingLocationTypeReducer(newState,
          geoTargetingLocationTypeActions.showInfoForType(typesWithKeys[2]));
        // Show info for third type
        newState     = geoTargetingLocationTypeReducer(newState,
          geoTargetingLocationTypeActions.showInfoForType(typesWithKeys[3]));

        let typesWithInfo = newState.types.filter((type) => type.showInfo);

        expect(typesWithInfo.length)
          .toEqual(1, 'should have only exactly one type with active info');

        expect(typesWithInfo[0].id)
          .toEqual(typesWithKeys[3].id, 'type with active info should be with index 3');
      })
    );
  });

  describe(GeoTargetingLocationTypeActions.TOGGLE_TYPE_DROPDOWN, () => {
    it(`should change isOpen flag if passed no arguments`, inject([GeoTargetingLocationTypeActions],
      (geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) => {
        let state = geoTargetingLocationTypeInitial;

        deepFreeze(state);

        let newState = geoTargetingLocationTypeReducer(state,
          geoTargetingLocationTypeActions.toggleTypeDropdown());

        expect(newState.isOpen)
          .toEqual(true);

        newState = geoTargetingLocationTypeReducer(newState,
          geoTargetingLocationTypeActions.toggleTypeDropdown());

        expect(newState.isOpen)
          .toEqual(false);
      })
    );

    it(`should set isOpen flag to argument passed`, inject([GeoTargetingLocationTypeActions],
      (geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) => {
        let state = Object.assign({}, geoTargetingLocationTypeInitial, {
          isOpen: 'false' // it can't be string, but we set it as string to check it would be changed to boolean
        });

        deepFreeze(state);

        let newState = geoTargetingLocationTypeReducer(state,
          geoTargetingLocationTypeActions.toggleTypeDropdown(true));

        expect(newState.isOpen)
          .toEqual(true);

        newState = geoTargetingLocationTypeReducer(newState,
          geoTargetingLocationTypeActions.toggleTypeDropdown(false));

        expect(newState.isOpen)
          .toEqual(false);
      })
    );

    it(`should hide all info for all types`, inject([GeoTargetingLocationTypeActions],
      (geoTargetingLocationTypeActions: GeoTargetingLocationTypeActions) => {
        let state = geoTargetingLocationTypeInitial;

        deepFreeze(state);

        // Fill in types
        let newState = geoTargetingLocationTypeReducer(state, geoTargetingLocationTypeActions.setTranslatedTypes());
        // Show info for second type
        newState     = geoTargetingLocationTypeReducer(newState,
          geoTargetingLocationTypeActions.showInfoForType(typesWithKeys[2]));
        // Toggle dropdown
        newState     = geoTargetingLocationTypeReducer(newState,
          geoTargetingLocationTypeActions.toggleTypeDropdown(true));

        let typesWithInfo = newState.types.filter((type) => type.showInfo);

        expect(typesWithInfo.length)
          .toEqual(0, 'should have no types with active info');
      })
    );
  });
});
