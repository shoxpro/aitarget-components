import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

export interface TargetingSpec {

}

@Injectable()
export class TargetingSpecService {

  private _spec = new BehaviorSubject<TargetingSpec>({});
  public spec = this._spec.asObservable();

  public get (): TargetingSpec {
    return this._spec.getValue();
  }

  public update (spec: TargetingSpec) {
    this._spec.next(spec);
  }

  constructor () {}

}
