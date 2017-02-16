import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GeoDropdownService {

  _items = new Subject<any[]>();
  items  = this._items.asObservable();

  _isOpen = new Subject<boolean>();
  isOpen  = this._isOpen.asObservable();

  update (items) {
    this._items.next(items);
  }

  open () {
    this._isOpen.next(true);
  }

  close () {
    this._isOpen.next(false);
  }
}
