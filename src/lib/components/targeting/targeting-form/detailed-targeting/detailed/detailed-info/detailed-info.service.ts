import { Injectable } from '@angular/core';
import { DetailedItem } from '../detailed-item';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedInfoService {

  _item = new Subject<DetailedItem>();
  item  = this._item.asObservable();

  update (item: DetailedItem) {
    this._item.next(item);
  };
}
