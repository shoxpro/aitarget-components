import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingInputService {

  private _term = new Subject();
  public term   = this._term.asObservable();

  private _hasFocus = new Subject();
  public hasFocus   = this._hasFocus.asObservable();

  public setTerm (term: string) {
    this._term.next(term);
  }

  public focus () {
    this._hasFocus.next(true);
  }

  public blur () {
    this._hasFocus.next(false);
  }

  constructor () { }

}
