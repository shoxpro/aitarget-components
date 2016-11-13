import { Injectable } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingIdService } from '../geo-targeting.id';
import { Action } from '@ngrx/store';

@Injectable()
export class GeoTargetingSelectedActions {
  static ADD_ITEMS    = '[geo-targeting-selected] Add Items';
  static SET_ITEMS    = '[geo-targeting-selected] Set Items';
  static REMOVE_ITEMS = '[geo-targeting-selected] Remove Items';
  static UPDATE_ITEMS = '[geo-targeting-selected] Update Items';

  addItems (items: GeoTargetingItem[]): Action {
    return {
      type:    GeoTargetingSelectedActions.ADD_ITEMS,
      payload: {
        id:    this.geoTargetingIdService.id$.getValue(),
        items: items
      }
    };
  }

  setItems (items: GeoTargetingItem[]): Action {
    return {
      type:    GeoTargetingSelectedActions.SET_ITEMS,
      payload: {
        id:    this.geoTargetingIdService.id$.getValue(),
        items: items
      }
    };
  }

  removeItems (items: GeoTargetingItem[]): Action {
    return {
      type:    GeoTargetingSelectedActions.REMOVE_ITEMS,
      payload: {
        id:    this.geoTargetingIdService.id$.getValue(),
        items: items
      }
    };
  }

  updateItems (items: GeoTargetingItem[]): Action {
    return {
      type:    GeoTargetingSelectedActions.UPDATE_ITEMS,
      payload: {
        id:    this.geoTargetingIdService.id$.getValue(),
        items: items
      }
    };
  }

  constructor (private geoTargetingIdService: GeoTargetingIdService) {}
}
