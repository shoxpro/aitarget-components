import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

declare interface DataInterface {
  isVisible: boolean;
  type: string;
}

@Injectable()
export class DetailedTargetingSearchService {

  private _data = new Subject<DataInterface>();
  public data   = this._data.asObservable();

  public update (data: DataInterface) {
    this._data.next({
      isVisible: data.isVisible,
      type:      data.type
    });
  };

  constructor () { }

}
