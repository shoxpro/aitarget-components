import { Injectable } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

@Injectable()
export class GeoTargetingSelectedActions {
  static ADD_ITEM        = '[geo-targeting-selected] Add Item';
  static REMOVE_ITEM     = '[geo-targeting-selected] Remove Item';
  static SET_ACTIVE_ITEM = '[geo-targeting-selected] Set Active Item';
  static UPDATE_ITEM     = '[geo-targeting-selected] Update Item';

  addItem (item: GeoTargetingItem) {
    return {
      type:    GeoTargetingSelectedActions.ADD_ITEM,
      payload: {item}
    };
  }

  removeItem (item: GeoTargetingItem) {
    return {
      type:    GeoTargetingSelectedActions.REMOVE_ITEM,
      payload: {item}
    };
  }

  setActiveItem (activeItem: GeoTargetingItem) {
    return {
      type:    GeoTargetingSelectedActions.SET_ACTIVE_ITEM,
      payload: {activeItem}
    };
  }

  updateItem (item: GeoTargetingItem) {
    return {
      type:    GeoTargetingSelectedActions.UPDATE_ITEM,
      payload: {item}
    };
  }

  constructor () {}
}
