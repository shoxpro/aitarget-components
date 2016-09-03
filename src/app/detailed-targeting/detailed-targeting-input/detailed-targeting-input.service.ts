import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DetailedTargetingInputService {

  private _term = new Subject();
  public term   = this._term.asObservable();

  public setTerm (term: string) {
    this._term.next(term);
  }

  constructor () {}

}
