import { Injectable } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

@Injectable()
export class GeoTargetingSelectedActions {
  static ADD_ITEMS    = '[geo-targeting-selected] Add Items';
  static REMOVE_ITEMS = '[geo-targeting-selected] Remove Items';
  static UPDATE_ITEM  = '[geo-targeting-selected] Update Item';

  addItems (items: GeoTargetingItem[]) {
    return {
      type:    GeoTargetingSelectedActions.ADD_ITEMS,
      payload: {items}
    };
  }

  removeItems (items: GeoTargetingItem) {
    return {
      type:    GeoTargetingSelectedActions.REMOVE_ITEMS,
      payload: {items}
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
