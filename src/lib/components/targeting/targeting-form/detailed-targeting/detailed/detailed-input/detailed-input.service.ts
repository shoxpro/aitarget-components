import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedInputService {

  _term = new Subject();
  term  = this._term.asObservable();

  setTerm (term: string) {
    this._term.next(term);
  }

  constructor () {}

}
