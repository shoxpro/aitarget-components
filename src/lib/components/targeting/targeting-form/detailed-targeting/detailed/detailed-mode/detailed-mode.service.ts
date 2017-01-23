import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class DetailedModeService {

  _mode = new BehaviorSubject<String>(null);

  mode = this._mode.asObservable();

  get = function () {
    return this._mode.getValue();
  };

  set = function (mode: string) {
    this._mode.next(mode);
  };
}
