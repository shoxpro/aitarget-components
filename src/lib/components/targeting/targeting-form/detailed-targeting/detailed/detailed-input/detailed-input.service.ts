import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DetailedInputService {

  _term = new Subject();
  term  = this._term.asObservable();

  _hasFocus = new Subject();
  hasFocus  = this._hasFocus.asObservable();

  setTerm (term: string) {
    this._term.next(term);
  }

  setFocus (hasFocus: boolean) {
    this._hasFocus.next(hasFocus);
  }
}
