import { Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { BehaviorSubject } from 'rxjs/Rx';
import { data } from './data';

@Injectable()
export class DetailedTargetingSelectedService {

  private _items = new BehaviorSubject<DetailedTargetingItem[]>(<any>data);
  private _structuredSelectedMap: Object;
  private _structuredSelectedKeys: string[];
  public items = this._items.asObservable();

  public get (): DetailedTargetingItem[] {
    return this._items.getValue();
  }

  public updateSelected (items: DetailedTargetingItem[]) {
    this._items.next(items);
  }

  public getStructuredSelectedData () {
    return {
      keys: this._structuredSelectedKeys,
      map: this._structuredSelectedMap
    };
  }

  private updateStructuredSelectedData (items: DetailedTargetingItem[]) {
    this._structuredSelectedMap = {};
    this._structuredSelectedKeys = [];
    items.forEach((item) => {
      let lastInPath = item.path[item.path.length - 1];
      let key;
      if (item.name === lastInPath) {
        key = item.path.slice(0, -1)
                  .join(',');
      } else {
        key = item.path.join(',');
      }

      if (this._structuredSelectedKeys.indexOf(key) === -1) {
        this._structuredSelectedKeys.push(key);
      }

      this._structuredSelectedMap[key] = this._structuredSelectedMap[key] || [];

      this._structuredSelectedMap[key].push(item);
    });
  }

  constructor () {
    this.items.subscribe((items: DetailedTargetingItem[]) => {
      this.updateStructuredSelectedData(items);
    });
  }

}
