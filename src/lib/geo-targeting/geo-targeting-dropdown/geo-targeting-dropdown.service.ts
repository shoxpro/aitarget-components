import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingDropdownService {

  private _items = new Subject();
  public items   = this._items.asObservable();

  public update (items) {
    this._items.next(items);
  }

  constructor () { }

}
