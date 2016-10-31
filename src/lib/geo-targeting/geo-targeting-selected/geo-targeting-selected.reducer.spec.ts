import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import { geoTargetingSelectedInitial, geoTargetingSelectedReducer } from './geo-targeting-selected.reducer';
import { sortItems } from './geo-targeting-selected.constants';

let deepFreeze = require('deep-freeze');

describe(`geoTargetingSelectedReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingSelectedActions]
    });
  });

  describe(GeoTargetingSelectedActions.ADD_ITEM, () => {
    it(`should add item to selected items list`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let item  = {key: 'test', excluded: false};
        let item1 = {key: 'test1', excluded: false};
        let item2 = {key: 'test2', excluded: true};
        let state = Object.assign({}, geoTargetingSelectedInitial, {
          items: [item1]
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.addItem(item));

        expect(newState)
          .toEqual({items: [item, item1], activeItem: null}, 'included item should be added to the beginning');

        newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.addItem(item2));

        expect(newState)
          .toEqual({items: [item1, item2], activeItem: null}, 'excluded item should be added to the end');
      }));
  });

  describe(GeoTargetingSelectedActions.REMOVE_ITEM, () => {
    it(`should remove item from selected items list`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let item  = {key: 'test', excluded: false};
        let item1 = {key: 'test1', excluded: false};
        let item2 = {key: 'test2', excluded: true};
        let state = Object.assign({}, geoTargetingSelectedInitial, {
          items: [item, item1, item2]
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.removeItem(item1));

        expect(newState)
          .toEqual({items: [item, item2], activeItem: null});
      }));
  });

  describe(GeoTargetingSelectedActions.SET_ACTIVE_ITEM, () => {
    it(`should set item as active`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let state = geoTargetingSelectedInitial;
        let item  = {key: 'test', excluded: false};

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.setActiveItem(item));

        expect(newState)
          .toEqual({items: [], activeItem: item});
      }));
  });

  describe(GeoTargetingSelectedActions.UPDATE_ITEM, () => {
    it(`should update item in items list and active item if it is active`,
      inject([GeoTargetingSelectedActions], (geoTargetingSelectedActions) => {
        let item        = {key: 'test', excluded: false};
        let item1       = {key: 'test1', excluded: false};
        let item2       = {key: 'test2', excluded: true};
        let updatedItem = Object.assign({}, item1, {name: 'updatedItem', excluded: true});
        let state       = Object.assign({}, geoTargetingSelectedInitial, {
          items:      [item, item1, item2],
          activeItem: item1
        });

        deepFreeze(state);

        let newState = geoTargetingSelectedReducer(state, geoTargetingSelectedActions.updateItem(updatedItem));

        expect(newState)
          .toEqual({items: sortItems([item, updatedItem, item2]), activeItem: updatedItem});
      }));
  });
});
