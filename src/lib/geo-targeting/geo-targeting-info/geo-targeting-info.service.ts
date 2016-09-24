import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingInfoService {

  private _infoLevel = new Subject<'info'|'error'>();
  private _message   = new Subject<string>();
  private _canRevert = new Subject<boolean>();
  private _isVisible = new Subject<boolean>();

  public infoLevel = this._infoLevel.asObservable();
  public message   = this._message.asObservable();
  public canRevert = this._canRevert.asObservable();
  public isVisible = this._isVisible.asObservable();

  public update (infoLevel: 'info'|'error', message: string, canRevert = false) {
    this._infoLevel.next(infoLevel);
    this._message.next(message);
    this._canRevert.next(canRevert);
  }

  public show () {
    this._isVisible.next(true);
  }

  public hide () {
    this._isVisible.next(false);
  }

  constructor () { }

}
