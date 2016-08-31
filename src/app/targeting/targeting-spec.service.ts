import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { DetailedTargetingItem } from '../detailed-targeting/detailed-targeting-item';
import { TargetingSpec } from './targeting-spec.interface';

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
    let detailedTargeting = {};

    items.forEach((item: DetailedTargetingItem) => {
      detailedTargeting[item.type] = detailedTargeting[item.type] || [];
      detailedTargeting[item.type].push({ id: item.id, name: item.name });
    });

    Object.assign(spec, detailedTargeting, {});

    this.update(spec);
  }

  constructor () {}

}
