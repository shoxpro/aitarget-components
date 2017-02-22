import { TestBed, inject } from '@angular/core/testing';
import { GeoModeActions } from './geo-mode.actions';
import { geoModeInitial, geoModeReducer, GeoModeType, GeoModeIdType } from './geo-mode.reducer';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { GeoIdService } from '../geo.id';

let deepFreeze = require('deep-freeze-strict');

let modesWithKeys = [
  {
    id:   <GeoModeIdType>'include',
    name: `fba-geo-mode.include`
  },
  {
    id:   <GeoModeIdType>'exclude',
    name: `fba-geo-mode.exclude`
  },
  {
    id:   <GeoModeIdType>'delete',
    name: `fba-geo-mode.delete`
  }
];

describe(`geoModeReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoModeActions,
        {provide: GeoIdService, useValue: {id$: {getValue () { return; }}}},
        {provide: TranslateService, useValue: {instant (key) { return key; }}},
      ]
    });
  });

  describe(GeoModeActions.SET_TRANSLATED_MODES, () => {
    it(`should set translated list of modes`, inject([GeoModeActions],
      (geoModeActions: GeoModeActions) => {
        let state = geoModeInitial;

        deepFreeze(state);

        let newState = geoModeReducer(state, geoModeActions.setTranslatedModes());

        expect(newState.modes)
          .toEqual(modesWithKeys);
      })
    );

    it(`should translate selected mode`, inject([GeoModeActions],
      (geoModeActions: GeoModeActions) => {
        // Set selected type and reset its name and info
        let state = Object.assign({}, geoModeInitial, {
          selectedMode: Object.assign({}, modesWithKeys[1], {name: '', info: ''})
        });

        deepFreeze(state);

        let newState = geoModeReducer(state, geoModeActions.setTranslatedModes());

        expect(newState.selectedMode)
          .toEqual(modesWithKeys[1], 'should be selected mode with index 1 and name and info restored');
      })
    );

    it(`should set selected mode to default if it is null`, inject([GeoModeActions],
      (geoModeActions: GeoModeActions) => {
        // Set selected type and reset its name and info
        let state = geoModeInitial;

        deepFreeze(state);

        let newState = geoModeReducer(state, geoModeActions.setTranslatedModes());

        expect(newState.selectedMode)
          .toEqual(modesWithKeys[0], 'should set selected mode to be default type with index 0');
      })
    );
  });

  describe(GeoModeActions.SET_MODE, () => {
    it(`should set mode`, inject([GeoModeActions],
      (geoModeActions: GeoModeActions) => {
        let state                     = geoModeInitial;
        let selectedMode: GeoModeType = modesWithKeys[1];

        deepFreeze(state);

        let newState = geoModeReducer(state, geoModeActions.setMode(selectedMode));

        expect(newState)
          .toEqual(Object.assign({}, state, {selectedMode}));
      })
    );
  });

  describe(GeoModeActions.TOGGLE_MODE_DROPDOWN, () => {
    it(`should set isOpen flag`, inject([GeoModeActions],
      (geoModeActions: GeoModeActions) => {
        let state = geoModeInitial;

        deepFreeze(state);

        let newState = geoModeReducer(state, geoModeActions.toggleModeDropdown(true));

        expect(newState.isOpen)
          .toBeTruthy('should set isOpen flag to be true');
      })
    );
  });

});
