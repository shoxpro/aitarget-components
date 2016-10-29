import { TestBed, inject } from '@angular/core/testing';
import { geoTargetingInfoInitial, geoTargetingInfoReducer } from './geo-targeting-info.reducer';
import { GeoTargetingInfoActions } from './geo-targeting-info.actions';

let deepFreeze = require('deep-freeze');

let testInfo = {
  message:   'test message',
  isVisible: true,
  level:     'error',
  canRevert: true
};

fdescribe(`geoTargetingInfoReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoTargetingInfoActions
      ]
    });
  });

  describe(GeoTargetingInfoActions.SHOW_INFO, () => {
    it(`should set info properties to state`, inject([GeoTargetingInfoActions],
      (geoTargetingInfoActions: GeoTargetingInfoActions) => {
        let state = geoTargetingInfoInitial;

        deepFreeze(state);

        let newState = geoTargetingInfoReducer(state, geoTargetingInfoActions.showInfo(testInfo));

        expect(newState)
          .toEqual(testInfo);
      })
    );
  });

  describe(GeoTargetingInfoActions.HIDE_INFO, () => {
    it(`should hide info by resetting it to initial`, inject([GeoTargetingInfoActions],
      (geoTargetingInfoActions: GeoTargetingInfoActions) => {
        let state = testInfo;

        deepFreeze(state);

        let newState = geoTargetingInfoReducer(state, geoTargetingInfoActions.hideInfo());

        expect(newState)
          .toEqual(geoTargetingInfoInitial);
      })
    );
  });
});
