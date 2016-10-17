import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { LocationType } from '../../targeting/targeting-spec-geo.interface';

@Injectable()
export class GeoTargetingTypeService {

  _type = new BehaviorSubject<LocationType[]>(['home', 'recent']);
  type  = this._type.asObservable();

  update (type: LocationType[]) {
    this._type.next(type);
  }

  get () {
    return this._type.getValue();
  }

  constructor () { }

}
