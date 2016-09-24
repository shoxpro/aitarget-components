import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingDropdownService {

  private _items = new Subject<any[]>();
  public items   = this._items.asObservable();

  private _isOpen = new Subject<boolean>();
  public isOpen   = this._isOpen.asObservable();

  public update (items) {
    this._items.next(items);
  }

  public open () {
    this._isOpen.next(true);
  }

  public close () {
    this._isOpen.next(false);
  }

  constructor () { }

}
