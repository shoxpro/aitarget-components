import { Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { Subject, BehaviorSubject } from 'rxjs/Rx';

interface DefaultOpenItems {
  __ROOT__: boolean;
  _scrollTo: string;
}

@Injectable()
export class DetailedTargetingDropdownBrowseService {
  private _items = new Subject<DetailedTargetingItem[]>();

  private _defaultOpenItems: DefaultOpenItems = {
    __ROOT__:  true,
    _scrollTo: null
  };

  get defaultOpenItems () {
    return this._defaultOpenItems;
  }

  private _openItems = new BehaviorSubject<DefaultOpenItems>(this.defaultOpenItems);

  public items = this._items.asObservable();

  public openItems = this._openItems.asObservable();

  public updateDropdown (items: DetailedTargetingItem[]) {
    this._items.next(items);
  };

  public updateOpenItems (openItems) {
    this._openItems.next(openItems);
  };

  public getOpenItems () {
    return this._openItems.getValue();
  };

  constructor () {}

}
