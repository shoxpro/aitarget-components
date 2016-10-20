import { Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingDropdownSuggestedService {

  _items = new Subject<DetailedTargetingItem[]>();
  items  = this._items.asObservable();

  updateDropdown (items: DetailedTargetingItem[]) {
    this._items.next(items);
  };

  constructor () {}

}
