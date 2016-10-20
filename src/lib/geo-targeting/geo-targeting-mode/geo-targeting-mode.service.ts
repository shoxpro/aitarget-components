import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingModeService {

  _mode = new BehaviorSubject<'include'|'exclude'>('include');
  mode  = this._mode.asObservable();

  update (mode) {
    this._mode.next(mode);
  }

  get () {
    return this._mode.getValue();
  }

  constructor () { }

}
