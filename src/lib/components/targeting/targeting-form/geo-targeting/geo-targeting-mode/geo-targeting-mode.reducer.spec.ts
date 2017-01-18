import { TestBed, inject } from '@angular/core/testing';
import { geoTargetingModeActions, GeoTargetingModeActions } from './geo-targeting-mode.actions';
import { geoTargetingModeInitial, geoTargetingModeReducer, GeoTargetingModeIdType } from './geo-targeting-mode.reducer';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingIdService } from '../geo-targeting.id';

let deepFreeze = require('deep-freeze');

let modesWithKeys = [
  {
    id:   'include',
    name: `geo-targeting-mode.include`
  },
  {
    id:   'exclude',
    name: `geo-targeting-mode.exclude`
  },
  {
    id:   'delete',
    name: `geo-targeting-mode.delete`
  }
];

describe(`geoTargetingModeReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoTargetingModeActions,
        {provide: GeoTargetingIdService, useValue: {id$: {getValue () {}}}},
        {provide: TranslateService, useValue: {instant (key) { return key; }}},
      ]
    });
  });

  describe(GeoTargetingModeActions.SET_TRANSLATED_MODES, () => {
    it(`should set translated list of modes`, inject([GeoTargetingModeActions],
      (geoTargetingModeActions: GeoTargetingModeActions) => {
        let state = geoTargetingModeInitial;

        deepFreeze(state);

        let newState = geoTargetingModeReducer(state, geoTargetingModeActions.setTranslatedModes());

        expect(newState.modes)
          .toEqual(modesWithKeys);
      })
    );

    it(`should translate selected mode`, inject([GeoTargetingModeActions],
      (geoTargetingModeActions: GeoTargetingModeActions) => {
        // Set selected type and reset its name and info
        let state = Object.assign({}, geoTargetingModeInitial, {
          selectedMode: Object.assign({}, modesWithKeys[1], {name: '', info: ''})
        });

        deepFreeze(state);

        let newState = geoTargetingModeReducer(state, geoTargetingModeActions.setTranslatedModes());

        expect(newState.selectedMode)
          .toEqual(modesWithKeys[1], 'should be selected mode with index 1 and name and info restored');
      })
    );

    it(`should set selected mode to default if it is null`, inject([GeoTargetingModeActions],
      (geoTargetingModeActions: GeoTargetingModeActions) => {
        // Set selected type and reset its name and info
        let state = geoTargetingModeInitial;

        deepFreeze(state);

        let newState = geoTargetingModeReducer(state, geoTargetingModeActions.setTranslatedModes());

        expect(newState.selectedMode)
          .toEqual(modesWithKeys[0], 'should set selected mode to be default type with index 0');
      })
    );
  });

  describe(GeoTargetingModeActions.SET_MODE, () => {
    it(`should set mode`, inject([GeoTargetingModeActions],
      (geoTargetingModeActions: geoTargetingModeActions) => {
        let state                                = geoTargetingModeInitial;
        let selectedMode: GeoTargetingModeIdType = modesWithKeys[1];

        deepFreeze(state);

        let newState = geoTargetingModeReducer(state, geoTargetingModeActions.setMode(selectedMode));

        expect(newState)
          .toEqual(Object.assign({}, state, {selectedMode}));
      })
    );
  });

  describe(GeoTargetingModeActions.TOGGLE_MODE_DROPDOWN, () => {
    it(`should set isOpen flag`, inject([GeoTargetingModeActions],
      (geoTargetingModeActions: geoTargetingModeActions) => {
        let state = geoTargetingModeInitial;

        deepFreeze(state);

        let newState = geoTargetingModeReducer(state, geoTargetingModeActions.toggleModeDropdown(true));

        expect(newState.isOpen)
          .toBeTruthy('should set isOpen flag to be true');
      })
    );
  });

});
