import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

let nextId = 0;

@Injectable()
export class GeoIdService {

  _prefix = 'geo';
  id$     = new BehaviorSubject(`${this._prefix}-${nextId++}`);

  constructor () {}
}
