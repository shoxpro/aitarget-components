import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingModeService {

  private _mode = new BehaviorSubject<'include'|'exclude'>('include');
  public mode   = this._mode.asObservable();

  public update (mode) {
    this._mode.next(mode);
  }

  public get () {
    return this._mode.getValue();
  }

  constructor () { }

}
