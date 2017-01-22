import { TestBed, inject } from '@angular/core/testing';
import { geoInfoInitial, geoInfoReducer, InfoLevel } from './geo-info.reducer';
import { GeoInfoActions } from './geo-info.actions';
import { GeoIdService } from '../geo.id';

let deepFreeze = require('deep-freeze-strict');

let testInfo = {
  message:   'test message',
  isVisible: true,
  level:     <InfoLevel>'error',
  canRevert: true
};

describe(`geoInfoReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: GeoIdService, useValue: {id$: {getValue () { return; }}}},
        GeoInfoActions
      ]
    });
  });

  describe(GeoInfoActions.SHOW_INFO, () => {
    it(`should set info properties to state`, inject([GeoInfoActions],
      (geoInfoActions: GeoInfoActions) => {
        let state = geoInfoInitial;

        deepFreeze(state);

        let newState = geoInfoReducer(state, geoInfoActions.showInfo(testInfo));

        expect(newState)
          .toEqual(testInfo);
      })
    );
  });

  describe(GeoInfoActions.HIDE_INFO, () => {
    it(`should hide info by resetting it to initial`, inject([GeoInfoActions],
      (geoInfoActions: GeoInfoActions) => {
        let state = testInfo;

        deepFreeze(state);

        let newState = geoInfoReducer(state, geoInfoActions.hideInfo());

        expect(newState)
          .toEqual(geoInfoInitial);
      })
    );
  });
});
