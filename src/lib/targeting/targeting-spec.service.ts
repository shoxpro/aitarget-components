import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { TargetingSpec } from './targeting-spec.interface';
import { defaultDetailedTargetingSpec } from './targeting-spec-detailed.const';

@Injectable()
export class TargetingSpecService {

  _spec = new BehaviorSubject<TargetingSpec>({});
  spec  = this._spec.asObservable();

  get (): TargetingSpec {
    return this._spec.getValue();
  }

  /**
   * Remove empty array properties from Targeting Spec
   * @param items
   */
  clean (spec) {
    let updatedSpec = {};

    for (let property in spec) {
      if (!defaultDetailedTargetingSpec[property] || spec[property].length) {
        updatedSpec[property] = spec[property];
      }
    }

    return updatedSpec;
  }

  update (spec: TargetingSpec) {
    this._spec.next(spec);
  }

  constructor () {}

}
