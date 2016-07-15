import { Injectable } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingInfoService {

  private _item = new Subject<DetailedTargetingItem>();
  public item = this._item.asObservable();

  public update (item: DetailedTargetingItem) {
    this._item.next(item);
  };

  constructor () {}

}
