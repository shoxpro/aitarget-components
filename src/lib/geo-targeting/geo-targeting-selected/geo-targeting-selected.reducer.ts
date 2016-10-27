import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { Action, ActionReducer } from '@ngrx/store';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import { sortItems } from './geo-targeting-selected.constants';

export interface GeoTargetingSelectedState {
  items: Array<GeoTargetingItem>;
  activeItem: GeoTargetingItem | null;
}

export const geoTargetingSelectedInitial: GeoTargetingSelectedState = {
  items:      [],
  activeItem: null
};

export const GEO_TARGETING_SELECTED_KEY = 'geoTargetingSelected';

export const geoTargetingSelectedReducer: ActionReducer<GeoTargetingSelectedState> =
               (state = geoTargetingSelectedInitial,
                action: Action) => {
                 let items;
                 let activeItem;
                 switch (action.type) {
                   case GeoTargetingSelectedActions.ADD_ITEM:
                     if (action.payload.item.excluded) {
                       items = [...state.items, action.payload.item];
                     } else {
                       items = [action.payload.item, ...state.items];
                     }
                     return Object.assign({}, state, {items});
                   case GeoTargetingSelectedActions.REMOVE_ITEM:
                     items = state.items.filter((item) => item.key !== action.payload.item.key);
                     return Object.assign({}, state, {items});
                   case GeoTargetingSelectedActions.SET_ACTIVE_ITEM:
                     activeItem = action.payload.activeItem;
                     return Object.assign({}, state, {activeItem});
                   case GeoTargetingSelectedActions.UPDATE_ITEM:
                     activeItem = Object.assign({}, state.activeItem, action.payload.item);
                     items      = state.items.map((item) => {
                       if (item.key === action.payload.item.key) {
                         return Object.assign({}, item, action.payload.item);
                       }
                       return item;
                     });
                     items      = sortItems(items);
                     return Object.assign({}, state, {items, activeItem});
                   default:
                     return state;
                 }
               };
