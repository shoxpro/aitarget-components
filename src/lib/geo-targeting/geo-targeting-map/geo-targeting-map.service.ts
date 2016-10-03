import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

@Injectable()
export class GeoTargetingMapService {

  private _item = new Subject();
  public item   = this._item.asObservable();

  public update (item: GeoTargetingItem) {
    this._item.next(item);
  }

  constructor () { }

}
