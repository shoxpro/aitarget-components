import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { DetailedTargetingItem } from '../detailed-targeting/detailed-targeting-item';

export type TargetingSpec = {
  detailedTargeting: Object
};

@Injectable()
export class TargetingSpecService {

  private _spec = new BehaviorSubject<TargetingSpec>(<TargetingSpec>{});
  public spec = this._spec.asObservable();

  public get (): TargetingSpec {
    return this._spec.getValue();
  }

  public update (spec: TargetingSpec) {
    this._spec.next(spec);
  }

  public updateWithDetailedTargeting (items: DetailedTargetingItem[]) {
    let spec = this.get();
    spec.detailedTargeting = {};
    items.forEach((item: DetailedTargetingItem) => {
      spec.detailedTargeting[item.type] = spec.detailedTargeting[item.type] || [];
      spec.detailedTargeting[item.type].push({ id: item.id, name: item.name });
    });

    this.update(spec);
  }

  constructor () {}

}
