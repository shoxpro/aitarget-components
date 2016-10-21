import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingInputService {

  _term = new Subject<string>();
  term  = this._term.asObservable();

  _hasFocus = new Subject();
  hasFocus  = this._hasFocus.asObservable();

  setTerm (term: string) {
    this._term.next(term);
  }

  focus () {
    this._hasFocus.next(true);
  }

  blur () {
    this._hasFocus.next(false);
  }

  constructor () { }

}
