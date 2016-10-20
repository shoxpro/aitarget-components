import { Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingInfoService {

  _item = new Subject<DetailedTargetingItem>();
  item  = this._item.asObservable();

  update (item: DetailedTargetingItem) {
    this._item.next(item);
  };

  constructor () {}

}
