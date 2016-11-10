import { Injectable } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

@Injectable()
export class GeoTargetingSelectedActions {
  static ADD_ITEMS    = '[geo-targeting-selected] Add Items';
  static SET_ITEMS    = '[geo-targeting-selected] Set Items';
  static REMOVE_ITEMS = '[geo-targeting-selected] Remove Items';
  static UPDATE_ITEMS = '[geo-targeting-selected] Update Items';

  addItems (items: GeoTargetingItem[]) {
    return {
      type:    GeoTargetingSelectedActions.ADD_ITEMS,
      payload: {items}
    };
  }

  setItems (items: GeoTargetingItem[]) {
    return {
      type:    GeoTargetingSelectedActions.SET_ITEMS,
      payload: {items}
    };
  }

  removeItems (items: GeoTargetingItem[]) {
    return {
      type:    GeoTargetingSelectedActions.REMOVE_ITEMS,
      payload: {items}
    };
  }

  updateItems (items: GeoTargetingItem[]) {
    return {
      type:    GeoTargetingSelectedActions.UPDATE_ITEMS,
      payload: {items}
    };
  }

  constructor () {}
}
