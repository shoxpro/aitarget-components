import { Injectable } from '@angular/core';
import { DetailedItem } from '../detailed-item';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DetailedDropdownSuggestedService {

  _items = new Subject<DetailedItem[]>();
  items  = this._items.asObservable();

  updateDropdown (items: DetailedItem[]) {
    this._items.next(items);
  };
}
