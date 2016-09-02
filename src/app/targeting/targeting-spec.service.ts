import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { DetailedTargetingItem } from '../detailed-targeting/detailed-targeting-item';
import { TargetingSpec } from './targeting-spec.interface';
import { defaultDetailedTargetingSpec } from './targeting-spec-detailed.const';

@Injectable()
export class TargetingSpecService {

  private _spec = new BehaviorSubject<TargetingSpec>(<TargetingSpec>{});
  public spec   = this._spec.asObservable();

  public get (): TargetingSpec {
    return this._spec.getValue();
  }

  public update (spec: TargetingSpec) {
    this._spec.next(spec);
  }

  public updateWithDetailedTargeting (items: DetailedTargetingItem[]) {
    let spec              = this.get();
    let detailedTargeting = {};

    items.forEach((item: DetailedTargetingItem) => {
      detailedTargeting[item.type] = detailedTargeting[item.type] || [];
      detailedTargeting[item.type].push({ id: item.id, name: item.name });
    });

    // Extend current spec with default detailed targeting spec and current detailed targeting
    let updatedSpec = {};
    // noinspection TypeScriptUnresolvedFunction
    Object.assign(spec, defaultDetailedTargetingSpec, detailedTargeting);
    for (let property in spec) {
      if (!defaultDetailedTargetingSpec[property] || spec[property].length) {
        updatedSpec[property] = spec[property];
      }
    }

    this.update(updatedSpec);
  }

  constructor () {}

}
