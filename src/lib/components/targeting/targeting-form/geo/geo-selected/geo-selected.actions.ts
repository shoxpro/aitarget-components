import { Injectable } from '@angular/core';
import { GeoItem } from '../geo-item.interface';
import { GeoIdService } from '../geo.id';
import { Action } from '@ngrx/store';

@Injectable()
export class GeoSelectedActions {
  static ADD_ITEMS    = '[geo-selected] Add Items';
  static SET_ITEMS    = '[geo-selected] Set Items';
  static REMOVE_ITEMS = '[geo-selected] Remove Items';
  static UPDATE_ITEMS = '[geo-selected] Update Items';

  addItems (items: GeoItem[]): Action {
    return {
      type:    GeoSelectedActions.ADD_ITEMS,
      payload: {
        id:    this.geoIdService.id$.getValue(),
        items: items
      }
    };
  }

  setItems (items: GeoItem[]): Action {
    return {
      type:    GeoSelectedActions.SET_ITEMS,
      payload: {
        id:    this.geoIdService.id$.getValue(),
        items: items
      }
    };
  }

  removeItems (items: GeoItem[]): Action {
    return {
      type:    GeoSelectedActions.REMOVE_ITEMS,
      payload: {
        id:    this.geoIdService.id$.getValue(),
        items: items
      }
    };
  }

  updateItems (items: GeoItem[]): Action {
    return {
      type:    GeoSelectedActions.UPDATE_ITEMS,
      payload: {
        id:    this.geoIdService.id$.getValue(),
        items: items
      }
    };
  }

  constructor (private geoIdService: GeoIdService) {}
}
