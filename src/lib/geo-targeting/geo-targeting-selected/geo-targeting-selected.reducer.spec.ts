import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import { geoTargetingSelectedInitial, geoTargetingSelectedReducer } from './geo-targeting-selected.reducer';
import { sortItems } from './geo-targeting-selected.constants';
import { country, region, zip, city } from './geo-targeting-selected.mocks';

let deepFreeze = require('deep-freeze');

fdescribe(`geoTargetingSelectedReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingSelectedActions]
    });
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

  describe(GeoTargetingSelectedActions.UPDATE_ITEM, () => {
    it(`should update item in items list`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let item        = {key: 'test', excluded: false};
        let item1       = {key: 'test1', excluded: false};
        let item2       = {key: 'test2', excluded: true};
        let updatedItem = Object.assign({}, item1, {name: 'updatedItem', excluded: true});
        let state       = Object.assign({}, geoTargetingSelectedInitial, {
          items: [item, item1, item2]
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.updateItem(updatedItem));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            itemsPrevious: state.items,
            items:         sortItems([item, updatedItem, item2])
          }));
      }));
  });
});
