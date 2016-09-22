import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

@Injectable()
export class GeoTargetingSelectedService {

  private _items = new BehaviorSubject<GeoTargetingItem[]>([]);
  public items   = this._items.asObservable();

  public get () {
    return this._items.getValue();
  }

  public update (items: GeoTargetingItem[]) {
    this._items.next(items);
  }

  public add (item: GeoTargetingItem) {
    let selectedItems = this._items.getValue();

    // Filter out broader region location
    if (item.region_id) {
      selectedItems = selectedItems.filter((selectedItem: GeoTargetingItem) => {
        return selectedItem.key !== item.region_id.toString();
      });
    }

    // Filter out broader country location
    if (item.country_code) {
      selectedItems = selectedItems.filter((selectedItem: GeoTargetingItem) => {
        return selectedItem.key !== item.country_code;
      });
    }

    selectedItems.push(item);

    this.update(selectedItems);
  }

  public remove (item: GeoTargetingItem) {
    let selectedItems = this._items.getValue();

    // Filter out passed item
    selectedItems = selectedItems.filter((selectedItem: GeoTargetingItem) => {
      return selectedItem.key !== item.key;
    });

    this.update(selectedItems);
  }

  public getSpec () {}

  constructor () { }

}
