import { geoTargetingSearchReducer, geoTargetingSearchInitial } from './geo-taregting-search.reducer';
import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingSearchActions } from './geo-targeting-search.actions';

let deepFreeze = require('deep-freeze');

describe(`geoTargetingSearchReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingSearchActions]
    });
  });

  describe(GeoTargetingSearchActions.PROCESS_INPUT_VALUE, () => {
    it(`should set input value and extract array of terms`, inject([GeoTargetingSearchActions],
      (geoTargetingSearchActions: GeoTargetingSearchActions) => {
        let state      = geoTargetingSearchInitial;
        let inputValue = 'Moscow  ; omsk;(40.638967, -95.449219); 56.1578, 47.2467);-2.558963 20.917969;' +
          '55.522412    44.121094  ;-57.189855;moscow Oblast;192198';

        deepFreeze(state);

        let newState = geoTargetingSearchReducer(state, geoTargetingSearchActions.processInputValue(inputValue));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            inputValue:   inputValue,
            terms:        [
              {input: 'Moscow  ', query: 'moscow', customLocationKey: ''},
              {input: ' omsk', query: 'omsk', customLocationKey: ''},
              {input: '(40.638967, -95.449219)', query: '', customLocationKey: '(40.638967, -95.449219)'},
              {input: ' 56.1578, 47.2467)', query: '', customLocationKey: '(56.1578, 47.2467)'},
              {input: '-2.558963 20.917969', query: '', customLocationKey: '(-2.558963, 20.917969)'},
              {input: '55.522412    44.121094  ', query: '', customLocationKey: '(55.522412, 44.121094)'},
              {input: '-57.189855', query: '-57.189855', customLocationKey: ''},
              {input: 'moscow Oblast', query: 'moscow oblast', customLocationKey: ''},
              {input: '192198', query: '192198', customLocationKey: ''},
            ],
            termsGrouped: {
              queries:            ['moscow', 'omsk', '-57.189855', 'moscow oblast', '192198'],
              customLocationKeys: ['(40.638967, -95.449219)', '(56.1578, 47.2467)',
                '(-2.558963, 20.917969)', '(55.522412, 44.121094)']
            }
          }));
      })
    );
  });

  describe(GeoTargetingSearchActions.UPDATE_MODEL, () => {
    it(`should update all model values from passed payload model`,
      inject([GeoTargetingSearchActions], (geoTargetingSearchActions: GeoTargetingSearchActions) => {
        let state        = geoTargetingSearchInitial;
        let updatedModel = {items: [1], termsFound: [2], termsNotFound: [3], termsMatches: [4]};
        deepFreeze(state);

        let newState = geoTargetingSearchReducer(state, geoTargetingSearchActions.updateModel(updatedModel));

        expect(newState)
          .toEqual(Object.assign({}, state, updatedModel));

      })
    );
  });
});
