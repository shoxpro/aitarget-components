import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';


@Injectable()
export class DetailedTargetingSearchService {

  private _visible = new Subject<boolean>();
  public visible   = this._visible.asObservable();

  public setVisible (isVisible: boolean) {
    this._visible.next(isVisible);
  };

  constructor () { }

}
