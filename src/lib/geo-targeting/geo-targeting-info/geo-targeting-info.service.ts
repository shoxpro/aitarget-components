import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingInfoService {

  _infoLevel = new Subject<'info'|'error'>();
  _message   = new Subject<string>();
  _canRevert = new Subject<boolean>();
  _isVisible = new Subject<boolean>();

  infoLevel = this._infoLevel.asObservable();
  message   = this._message.asObservable();
  canRevert = this._canRevert.asObservable();
  isVisible = this._isVisible.asObservable();

  update (infoLevel: 'info'|'error', message: string, canRevert = false) {
    this._infoLevel.next(infoLevel);
    this._message.next(message);
    this._canRevert.next(canRevert);
  }

  show () {
    this._isVisible.next(true);
  }

  hide () {
    this._isVisible.next(false);
  }

  constructor () { }

}
