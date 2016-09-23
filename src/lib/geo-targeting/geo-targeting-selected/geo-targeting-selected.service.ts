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
    let replacedItems = [];

    selectedItems = selectedItems.filter((selectedItem: GeoTargetingItem) => {
      let toReplace =
            /*replace selected region, city, zip, geo_market and electoral_district*/
            selectedItem.country_code === item.key ||
            /*replace selected country*/
            selectedItem.key === item.country_code ||
            /*replace selected region*/
            (item.region_id && selectedItem.key === item.region_id.toString()) ||
            /*replace selected city and zip*/
            (selectedItem.region_id && selectedItem.region_id.toString() === item.key) ||
            /*replace selected city*/
            (item.primary_city_id && selectedItem.key === item.primary_city_id.toString()) ||
            /*replace selected zip*/
            (selectedItem.primary_city_id && selectedItem.primary_city_id.toString() === item.key);

      if (toReplace) {
        replacedItems.push(selectedItem);
      }

      return !toReplace;
    });

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
