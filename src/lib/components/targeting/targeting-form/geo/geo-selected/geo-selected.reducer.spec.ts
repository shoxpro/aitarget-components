import { TestBed, inject } from '@angular/core/testing';
import { GeoSelectedActions } from './geo-selected.actions';
import { geoSelectedInitial, geoSelectedReducer, GEO_TARGETING_SELECTED_KEY } from './geo-selected.reducer';
import { sortItems } from './geo-selected.constants';
import { country, region, zip, city } from './geo-selected.mocks';
import { GeoIdService } from '../geo.id';
import { SharedActions } from '../../../../../shared/actions/index';

let deepFreeze = require('deep-freeze');

describe(`geoSelectedReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoSelectedActions,
        SharedActions,
        {provide: GeoIdService, useValue: {id$: {getValue () {}}}},
      ]
    });
  });

  describe(GeoSelectedActions.SET_ITEMS, () => {
    it(`should set items to selected items list`,
      inject([GeoSelectedActions], (geoSelectedActions) => {
        let item  = {key: 'test', excluded: false};
        let item1 = {key: 'test1', excluded: false};
        let item2 = {key: 'test2', excluded: true};
        let state = Object.assign({}, geoSelectedInitial, {
          items: []
        });

        deepFreeze(state);

        let newState = geoSelectedReducer(state, geoSelectedActions.setItems([item, item1, item2]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [item, item1, item2],
            itemsPrevious: []
          }));
      }));
  });

  describe(GeoSelectedActions.ADD_ITEMS, () => {
    it(`should add items to selected items list`,
      inject([GeoSelectedActions], (geoSelectedActions) => {
        let item  = {key: 'test', excluded: false};
        let item1 = {key: 'test1', excluded: false};
        let item2 = {key: 'test2', excluded: true};
        let state = Object.assign({}, geoSelectedInitial, {
          items: [item1]
        });

        deepFreeze(state);

        let newState = geoSelectedReducer(state, geoSelectedActions.addItems([item]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, item, {active: true}), Object.assign({}, item1, {active: false})],
            itemsPrevious: state.items
          }), 'included item should be added to the beginning');

        newState = geoSelectedReducer(state, geoSelectedActions.addItems([item2]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, item1, {active: false}), Object.assign({}, item2, {active: true})],
            itemsPrevious: state.items
          }), 'excluded item should be added to the end');

        newState = geoSelectedReducer(newState, geoSelectedActions.addItems([item2]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, item1, {active: false}), Object.assign({}, item2, {active: true})],
            itemsPrevious: [Object.assign({}, item1, {active: false}), Object.assign({}, item2, {active: true})]
          }), 'should not add items that have already been added');
      }));

    it(`should add items to selected items list, replacing broader locations`,
      inject([GeoSelectedActions], (geoSelectedActions) => {
        let state = Object.assign({}, geoSelectedInitial, {
          items: [country]
        });

        deepFreeze(state);

        let newState = geoSelectedReducer(state, geoSelectedActions.addItems([region]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, region, {active: true})],
            itemsPrevious: [Object.assign({}, country)],
            itemsReplaced: [Object.assign({}, country)]
          }));

        newState = geoSelectedReducer(newState, geoSelectedActions.addItems([city]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, city, {active: true})],
            itemsPrevious: [Object.assign({}, region, {active: true})],
            itemsReplaced: [Object.assign({}, region, {active: true})]
          }));

        newState = geoSelectedReducer(newState, geoSelectedActions.addItems([zip]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, zip, {active: true})],
            itemsPrevious: [Object.assign({}, city, {active: true})],
            itemsReplaced: [Object.assign({}, city, {active: true})]
          }));
      }));

    it(`should add items to selected items list, replacing narrower locations`,
      inject([GeoSelectedActions], (geoSelectedActions) => {
        let state = Object.assign({}, geoSelectedInitial, {
          items: [zip]
        });

        deepFreeze(state);

        let newState = geoSelectedReducer(state, geoSelectedActions.addItems([city]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, city, {active: true})],
            itemsPrevious: [Object.assign({}, zip)],
            itemsReplaced: [Object.assign({}, zip)]
          }));

        newState = geoSelectedReducer(newState, geoSelectedActions.addItems([region]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, region, {active: true})],
            itemsPrevious: [Object.assign({}, city, {active: true})],
            itemsReplaced: [Object.assign({}, city, {active: true})]
          }));

        newState = geoSelectedReducer(newState, geoSelectedActions.addItems([country]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            items:         [Object.assign({}, country, {active: true})],
            itemsPrevious: [Object.assign({}, region, {active: true})],
            itemsReplaced: [Object.assign({}, region, {active: true})]
          }));
      }));
  });

  describe(GeoSelectedActions.REMOVE_ITEMS, () => {
    it(`should remove items from selected items list`,
      inject([GeoSelectedActions], (geoSelectedActions) => {
        let state = Object.assign({}, geoSelectedInitial, {
          items: [country, region, city, zip] // Unreal list, only for the sake of testing
        });

        deepFreeze(state);

        let newState = geoSelectedReducer(state, geoSelectedActions.removeItems([region, zip]));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            itemsPrevious: state.items,
            items:         [country, city] // Unreal list, only for the sake of testing
          }));
      }));
  });

  describe(GeoSelectedActions.UPDATE_ITEMS, () => {
    it(`should update items in items list`,
      inject([GeoSelectedActions], (geoSelectedActions) => {
        let item         = {key: 'test', excluded: false};
        let item1        = {key: 'test1', excluded: false};
        let item2        = {key: 'test2', excluded: true};
        let updatedItem1 = Object.assign({}, item1, {name: 'updatedItem1', excluded: true});
        let updatedItem2 = Object.assign({}, item2, {name: 'updatedItem2', excluded: true});
        let state = Object.assign({}, geoSelectedInitial, {
          items: [item, item1, item2]
        });

        deepFreeze(state);

        let newState = geoSelectedReducer(state, geoSelectedActions.updateItems([
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
        let state = Object.assign({}, geoSelectedInitial, {
          items:         [item],
          itemsPrevious: [item1, item2]
        });

        deepFreeze(state);

        let newState = geoSelectedReducer(state, sharedActions.revert(GEO_TARGETING_SELECTED_KEY));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            itemsPrevious: state.items,
            items:         state.itemsPrevious
          }));
      }));
  });
});
