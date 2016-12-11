import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingInputService {

  _term = new Subject();
  term  = this._term.asObservable();

  setTerm (term: string) {
    this._term.next(term);
  }

  constructor () {}

}
