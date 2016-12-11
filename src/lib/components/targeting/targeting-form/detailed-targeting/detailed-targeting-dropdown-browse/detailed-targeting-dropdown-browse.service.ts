import { Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { Subject, BehaviorSubject } from 'rxjs/Rx';

interface DefaultOpenItems {
  __ROOT__: boolean;
  _scrollTo: string;
}

@Injectable()
export class DetailedTargetingDropdownBrowseService {
  _items = new Subject<DetailedTargetingItem[]>();

  _defaultOpenItems: DefaultOpenItems = {
    __ROOT__:  true,
    _scrollTo: null
  };

  get defaultOpenItems () {
    return this._defaultOpenItems;
  }

  _openItems = new BehaviorSubject<DefaultOpenItems>(this.defaultOpenItems);

  items = this._items.asObservable();

  openItems = this._openItems.asObservable();

  updateDropdown (items: DetailedTargetingItem[]) {
    this._items.next(items);
  };

  updateOpenItems (openItems) {
    this._openItems.next(openItems);
  };

  getOpenItems () {
    return this._openItems.getValue();
  };

  constructor () {}

}
