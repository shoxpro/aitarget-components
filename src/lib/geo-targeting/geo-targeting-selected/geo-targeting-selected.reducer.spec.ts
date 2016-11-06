import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import {
  geoTargetingSelectedInitial, geoTargetingSelectedReducer, GEO_TARGETING_SELECTED_KEY
} from './geo-targeting-selected.reducer';
import { sortItems } from './geo-targeting-selected.constants';
import { country, region, zip, city } from './geo-targeting-selected.mocks';
import { SharedActions } from '../../shared/actions/index';

let deepFreeze = require('deep-freeze');

describe(`geoTargetingSelectedReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingSelectedActions, SharedActions]
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
            items:         [item, item1],
            itemsPrevious: state.items
          }), 'included item should be added to the beginning');

        newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.addItems([item2]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [item1, item2],
            itemsPrevious: state.items
          }), 'excluded item should be added to the end');

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([item2]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [item1, item2],
            itemsPrevious: [item1, item2]
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
            items:         [region],
            itemsPrevious: [country],
            itemsReplaced: [country]
          }));

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([city]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [city],
            itemsPrevious: [region],
            itemsReplaced: [region]
          }));

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([zip]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [zip],
            itemsPrevious: [city],
            itemsReplaced: [city]
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
            items:         [city],
            itemsPrevious: [zip],
            itemsReplaced: [zip]
          }));

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([region]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [region],
            itemsPrevious: [city],
            itemsReplaced: [city]
          }));

        newState = geoTargetingSelectedReducer(newState, geoTargetingSelectedActions.addItems([country]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [country],
            itemsPrevious: [region],
            itemsReplaced: [region]
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
            items:         sortItems([item, updatedItem1, updatedItem2])
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
