import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { Action, ActionReducer } from '@ngrx/store';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import { sortItems, isNarrower, isBroader } from './geo-targeting-selected.constants';
import { SharedActions } from '../../shared/actions/index';

export interface GeoTargetingSelectedState {
  items: Array<GeoTargetingItem>;
  itemsPrevious: Array<GeoTargetingItem>;
  itemsReplaced: Array<GeoTargetingItem>;
}

export const geoTargetingSelectedInitial: GeoTargetingSelectedState = {
  items:         [],
  itemsPrevious: [],
  itemsReplaced: []
};

export const GEO_TARGETING_SELECTED_KEY = 'geoTargetingSelected';

export const geoTargetingSelectedReducer: ActionReducer<GeoTargetingSelectedState> =
               (state = geoTargetingSelectedInitial,
                action: Action) => {
                 let items;
                 let itemsPrevious;
                 switch (action.type) {
                   case GeoTargetingSelectedActions.SET_ITEMS:
                     items = action.payload.items;

                     return Object.assign({}, state, {items});
                   case GeoTargetingSelectedActions.ADD_ITEMS:
                     let newState: GeoTargetingSelectedState = {
                       items:         [],
                       itemsPrevious: state.items,
                       itemsReplaced: []
                     };

                     // Sort out existing selected items
                     action.payload.items.reduce((acc: GeoTargetingSelectedState, item, index) => {
                       state.items.forEach((selectedItem) => {
                         // Already added items should become inactive
                         selectedItem = Object.assign({}, selectedItem, {active: false});

                         if (item.excluded === selectedItem.excluded &&
                           (isNarrower(item, selectedItem) || isBroader(item, selectedItem))) {
                           acc.itemsReplaced.push(selectedItem);
                         } else {
                           acc.items.push(selectedItem);
                         }
                       });

                       if (index === action.payload.items.length - 1) {
                         // Newly added items should be marked as active
                         const itemsToAdd    = action.payload.items.map((itemToAdd) => {
                             return Object.assign({}, itemToAdd, {active: true});
                           }
                         );
                         const combinedItems = [...itemsToAdd, ...acc.items];
                         items               = combinedItems.reduce((itemsMap, combinedItem, i) => {
                           itemsMap[combinedItem.key] = combinedItem;
                           if (i === combinedItems.length - 1) {
                             return Object.values(itemsMap);
                           }
                           return itemsMap;
                         }, {});

                         acc.items = sortItems(items);
                       }

                       return acc;
                     }, newState);

                     return Object.assign({}, state, newState);
                   case GeoTargetingSelectedActions.REMOVE_ITEMS:
                     let removedKeys = action.payload.items.map((item) => item.key);
                     items           = state.items.filter((item) => removedKeys.indexOf(item.key) === -1);
                     itemsPrevious   = state.items;

                     return Object.assign({}, state, {items, itemsPrevious});
                   case GeoTargetingSelectedActions.UPDATE_ITEMS:
                     items = state.items.map((item) => {
                       // Already added items should become inactive
                       item = Object.assign({}, item, {active: false});
                       action.payload.items.forEach((updatedItem) => {
                         if (item.key === updatedItem.key) {
                           // Updated item should be active
                           item = Object.assign({}, item, updatedItem, {active: true});
                         }
                       });
                       return item;
                     });

                     items         = sortItems(items);
                     itemsPrevious = state.items;

                     return Object.assign({}, state, {items, itemsPrevious});
                   case SharedActions.REVERT:
                     if (action.payload.revertKeys.includes(GEO_TARGETING_SELECTED_KEY)) {
                       items         = state.itemsPrevious;
                       itemsPrevious = state.items;
                     }

                     return Object.assign({}, state, {items, itemsPrevious});
                   default:
                     return state;
                 }
               };
