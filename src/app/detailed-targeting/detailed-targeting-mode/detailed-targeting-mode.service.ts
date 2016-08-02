import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingModeService {

  private _mode = new BehaviorSubject<String>('suggested');

  public mode = this._mode.asObservable();

  public get = function () {
    return this._mode.getValue();
  };

  public set = function (mode: string) {
    this._mode.next(mode);
  };

  constructor () {}

}
