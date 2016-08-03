import { Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingDropdownBrowseService {

  private _items = new Subject<DetailedTargetingItem[]>();
  public items = this._items.asObservable();

  public updateDropdown (items: DetailedTargetingItem[]) {
    this._items.next(items);
  };

  constructor () {}

}
