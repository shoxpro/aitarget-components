import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { Action, ActionReducer } from '@ngrx/store';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import { sortItems, isNarrower, isBroader } from './geo-targeting-selected.constants';
import { SharedActions } from '../../../../../shared/actions/index';

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
                       items:         state.items.slice(),
                       itemsPrevious: state.items.slice(),
                       itemsReplaced: []
                     };

                     // Filter out existing selected items and pick replaced items
                     newState.items = newState.items.filter((selectedItem) => {
                       const toReplace = action.payload.items.some((item) => {
                         return item.excluded === selectedItem.excluded &&
                           (isNarrower(item, selectedItem) || isBroader(item, selectedItem));
                       });

                       if (toReplace) {
                         newState.itemsReplaced.push(selectedItem);
                       }

                       return !toReplace;
                     });

                     // Newly added items should be marked as active
                     const itemsToAdd = action.payload.items.map((itemToAdd) => {
                         return Object.assign({}, itemToAdd, {active: true});
                       }
                     );

                     // Previously selected items should be marked as inactive
                     newState.items = newState.items.map((selectedItem) => {
                         return Object.assign({}, selectedItem, {active: false});
                       }
                     );

                     const combinedItems = [...itemsToAdd, ...newState.items];
                     // Leave only unique locations
                     items               = combinedItems.length ? combinedItems.reduce((itemsMap, combinedItem, i) => {
                       if (itemsMap[combinedItem.key]) {
                         itemsMap[combinedItem.key] = Object.assign({}, itemsMap[combinedItem.key], {active: true});
                       } else {
                         itemsMap[combinedItem.key] = combinedItem;
                       }
                       if (i === combinedItems.length - 1) {
                         return Object.values(itemsMap);
                       }
                       return itemsMap;
                     }, {}) : [];

                     newState.items = sortItems(items);

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
