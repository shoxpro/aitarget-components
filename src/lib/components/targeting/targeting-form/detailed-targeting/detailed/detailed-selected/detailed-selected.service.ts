import { Injectable } from '@angular/core';
import { DetailedItem } from '../detailed-item';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DetailedSelectedService {

  _items = new BehaviorSubject<DetailedItem[]>([]);
  items  = this._items.asObservable();

  get (): DetailedItem[] {
    return this._items.getValue();
  }

  updateSelected (items: DetailedItem[]) {
    this._items.next(items);
  }

  structureSelectedItems (items: DetailedItem[]) {
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
}
