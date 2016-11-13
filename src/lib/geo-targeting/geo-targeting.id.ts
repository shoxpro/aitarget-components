import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

let nextId = 0;

@Injectable()
export class GeoTargetingIdService {

  _prefix = 'geo-targeting';
  id$ = new BehaviorSubject(`${this._prefix}-${nextId++}`);

  constructor () {}
}
