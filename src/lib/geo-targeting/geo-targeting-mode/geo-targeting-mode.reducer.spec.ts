import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingModeActions } from './geo-targeting-mode.actions';
import { geoTargetingModeInitial, geoTargetingModeReducer, GeoTargetingModeType } from './geo-targeting-mode.reducer';

let deepFreeze = require('deep-freeze');

describe(`geoTargetingModeReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingModeActions]
    });
  });

  describe(GeoTargetingModeActions.SET_MODE, () => {
    it(`should set mode`, inject([GeoTargetingModeActions],
      (geoTargetingModeActions: GeoTargetingModeActions) => {
        let state                      = geoTargetingModeInitial;
        let mode: GeoTargetingModeType = 'exclude';

        deepFreeze(state);

        let newState = geoTargetingModeReducer(state, geoTargetingModeActions.setMode(mode));

        expect(newState)
          .toEqual(Object.assign({}, state, {mode}));
      })
    );
  });

});
