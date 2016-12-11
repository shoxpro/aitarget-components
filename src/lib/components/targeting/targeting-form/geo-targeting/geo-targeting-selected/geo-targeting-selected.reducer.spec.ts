import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import {
  geoTargetingSelectedInitial, geoTargetingSelectedReducer, GEO_TARGETING_SELECTED_KEY
} from './geo-targeting-selected.reducer';
import { sortItems } from './geo-targeting-selected.constants';
import { country, region, zip, city } from './geo-targeting-selected.mocks';
import { GeoTargetingIdService } from '../geo-targeting.id';
import { SharedActions } from '../../../../../shared/actions/index';

let deepFreeze = require('deep-freeze');

describe(`geoTargetingSelectedReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoTargetingSelectedActions,
        SharedActions,
        {provide: GeoTargetingIdService, useValue: {id$: {getValue () {}}}},
      ]
    });
  });

  describe(GeoTargetingSelectedActions.SET_ITEMS, () => {
    it(`should set items to selected items list`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let item  = {key: 'test', excluded: false};
        let item1 = {key: 'test1', excluded: false};
        let item2 = {key: 'test2', excluded: true};
        let state = Object.assign({}, geoTargetingSelectedInitial, {
          items: []
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.setItems([item, item1, item2]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [item, item1, item2],
            itemsPrevious: []
          }));
      }));
  });

  describe(GeoTargetingSelectedActions.ADD_ITEMS, () => {
    it(`should add items to selected items list`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let item  = {key: 'test', excluded: false};
        let item1 = {key: 'test1', excluded: false};
        let item2 = {key: 'test2', excluded: true};
        let state = Object.assign({}, geoTargetingSelectedInitial, {
          items: [item1]
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.addItems([item]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, item, {active: true}), Object.assign({}, item1, {active: false})],
            itemsPrevious: state.items
          }), 'included item should be added to the beginning');

        newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.addItems([item2]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, item1, {active: false}), Object.assign({}, item2, {active: true})],
            itemsPrevious: state.items
          }), 'excluded item should be added to the end');

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([item2]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, item1, {active: false}), Object.assign({}, item2, {active: true})],
            itemsPrevious: [Object.assign({}, item1, {active: false}), Object.assign({}, item2, {active: true})]
          }), 'should not add items that have already been added');
      }));

    it(`should add items to selected items list, replacing broader locations`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let state = Object.assign({}, geoTargetingSelectedInitial, {
          items: [country]
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.addItems([region]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, region, {active: true})],
            itemsPrevious: [Object.assign({}, country)],
            itemsReplaced: [Object.assign({}, country)]
          }));

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([city]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, city, {active: true})],
            itemsPrevious: [Object.assign({}, region, {active: true})],
            itemsReplaced: [Object.assign({}, region, {active: true})]
          }));

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([zip]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, zip, {active: true})],
            itemsPrevious: [Object.assign({}, city, {active: true})],
            itemsReplaced: [Object.assign({}, city, {active: true})]
          }));
      }));

    it(`should add items to selected items list, replacing narrower locations`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let state = Object.assign({}, geoTargetingSelectedInitial, {
          items: [zip]
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.addItems([city]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, city, {active: true})],
            itemsPrevious: [Object.assign({}, zip)],
            itemsReplaced: [Object.assign({}, zip)]
          }));

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([region]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, region, {active: true})],
            itemsPrevious: [Object.assign({}, city, {active: true})],
            itemsReplaced: [Object.assign({}, city, {active: true})]
          }));

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([country]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, country, {active: true})],
            itemsPrevious: [Object.assign({}, region, {active: true})],
            itemsReplaced: [Object.assign({}, region, {active: true})]
          }));
      }));
  });

  describe(GeoTargetingSelectedActions.REMOVE_ITEMS, () => {
    it(`should remove items from selected items list`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let state = Object.assign({}, geoTargetingSelectedInitial, {
          items: [country, region, city, zip] // Unreal list, only for the sake of testing
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.removeItems([region, zip]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            itemsPrevious: state.items,
            items:         [country, city] // Unreal list, only for the sake of testing
          }));
      }));
  });

  describe(GeoTargetingSelectedActions.UPDATE_ITEMS, () => {
    it(`should update items in items list`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let item         = {key: 'test', excluded: false};
        let item1        = {key: 'test1', excluded: false};
        let item2        = {key: 'test2', excluded: true};
        let updatedItem1 = Object.assign({}, item1, {name: 'updatedItem1', excluded: true});
        let updatedItem2 = Object.assign({}, item2, {name: 'updatedItem2', excluded: true});
        let state        = Object.assign({}, geoTargetingSelectedInitial, {
          items: [item, item1, item2]
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.updateItems([
          updatedItem1,
          updatedItem2
        ]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            itemsPrevious: state.items,
            items:         sortItems([
              Object.assign({}, item, {active: false}),
              Object.assign({}, updatedItem1, {active: true}),
              Object.assign({}, updatedItem2, {active: true})])
          }));
      }));
  });

  describe(SharedActions.REVERT, () => {
    it(`should revert - flip items and itemsPrevious`,
      inject([SharedActions], (sharedActions) => {
        let item  = {key: 'test', excluded: false};
        let item1 = {key: 'test1', excluded: false};
        let item2 = {key: 'test2', excluded: true};
        let state = Object.assign({}, geoTargetingSelectedInitial, {
          items:         [item],
          itemsPrevious: [item1, item2]
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, sharedActions.revert(GEO_TARGETING_SELECTED_KEY));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            itemsPrevious: state.items,
            items:         state.itemsPrevious
          }));
      }));
  });
});
