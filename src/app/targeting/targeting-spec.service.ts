import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { TargetingSpec } from './targeting-spec.interface';
import { defaultDetailedTargetingSpec } from './targeting-spec-detailed.const';

@Injectable()
export class TargetingSpecService {

  private _spec = new BehaviorSubject<TargetingSpec>({});
  public spec   = this._spec.asObservable();

  public get (): TargetingSpec {
    return this._spec.getValue();
  }

  /**
   * Remove empty array properties from Targeting Spec
   * @param items
   */
  public clean (spec) {
    let updatedSpec = {};

    for (let property in spec) {
      if (!defaultDetailedTargetingSpec[property] || spec[property].length) {
        updatedSpec[property] = spec[property];
      }
    }

    return updatedSpec;
  }

  public update (spec: TargetingSpec) {
    this._spec.next(spec);
  }

  constructor () {}

}
