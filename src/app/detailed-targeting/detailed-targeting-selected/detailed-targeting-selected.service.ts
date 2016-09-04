import { Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingSelectedService {

  private _items = new BehaviorSubject<DetailedTargetingItem[]>([]);
  public items   = this._items.asObservable();

  public get (): DetailedTargetingItem[] {
    return this._items.getValue();
  }

  public updateSelected (items: DetailedTargetingItem[]) {
    this._items.next(items);
  }

  public structureSelectedItems (items: DetailedTargetingItem[]) {
    let structuredSelectedMap  = {};
    let structuredSelectedKeys = [];
    items.forEach((item) => {
      let lastInPath = item.path[item.path.length - 1];
      let key;
      if (item.name === lastInPath) {
        key = item.path.slice(0, -1)
                  .join(' > ');
      } else {
        key = item.path.join(' > ');
      }

      if (structuredSelectedKeys.indexOf(key) === -1) {
        structuredSelectedKeys.push(key);
      }

      structuredSelectedMap[key] = structuredSelectedMap[key] || [];

      structuredSelectedMap[key].push(item);
    });

    return {
      keys: structuredSelectedKeys,
      map:  structuredSelectedMap
    };
  }

  constructor () {}

}
