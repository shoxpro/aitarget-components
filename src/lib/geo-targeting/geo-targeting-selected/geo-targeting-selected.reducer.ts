import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { Action, ActionReducer } from '@ngrx/store';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import { sortItems, isNarrower, isBroader } from './geo-targeting-selected.constants';

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
                   case GeoTargetingSelectedActions.ADD_ITEMS:
                     let newState: GeoTargetingSelectedState = {
                       items:         [],
                       itemsPrevious: state.items,
                       itemsReplaced: []
                     };

                     action.payload.items.reduce((acc: GeoTargetingSelectedState, item, index) => {
                       state.items.forEach((selectedItem) => {
                         if (isNarrower(item, selectedItem) || isBroader(item, selectedItem)) {
                           acc.itemsReplaced.push(selectedItem);
                         } else {
                           acc.items.push(selectedItem);
                         }
                       });

                       if (index === action.payload.items.length - 1) {
                         acc.items = sortItems([...action.payload.items, ...acc.items]);
                       }

                       return acc;
                     }, newState);

                     return Object.assign({}, state, newState);
                   case GeoTargetingSelectedActions.REMOVE_ITEMS:
                     let removedKeys = action.payload.items.map((item) => item.key);
                     items           = state.items.filter((item) => removedKeys.indexOf(item.key) === -1);
                     itemsPrevious   = state.items;

                     return Object.assign({}, state, {items, itemsPrevious});
                   case GeoTargetingSelectedActions.UPDATE_ITEM:
                     items = state.items.map((item) => {
                       if (item.key === action.payload.item.key) {
                         return Object.assign({}, item, action.payload.item);
                       }
                       return item;
                     });

                     items         = sortItems(items);
                     itemsPrevious = state.items;

                     return Object.assign({}, state, {items, itemsPrevious});
                   default:
                     return state;
                 }
               };
