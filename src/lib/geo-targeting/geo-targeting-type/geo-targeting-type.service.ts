import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { LocationType } from '../../targeting/targeting-spec-geo.interface';

@Injectable()
export class GeoTargetingTypeService {

  private _type = new BehaviorSubject<LocationType[]>(['home', 'recent']);
  public type   = this._type.asObservable();

  public update (type: LocationType[]) {
    this._type.next(type);
  }

  public get () {
    return this._type.getValue();
  }

  constructor () { }

}
