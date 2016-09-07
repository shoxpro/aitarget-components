import { Injectable } from '@angular/core';
import { DetailedTargetingSpec } from '../targeting/targeting-spec-detailed.interface';
import { BehaviorSubject } from 'rxjs';
import { defaultDetailedTargetingSpec } from '../targeting/targeting-spec-detailed.const';
import { DetailedTargetingItem } from './detailed-targeting-item';

@Injectable()
export class DetailedTargetingService {

  private _spec = new BehaviorSubject<DetailedTargetingSpec>(defaultDetailedTargetingSpec);
  public spec   = this._spec.asObservable();

  public get (): DetailedTargetingSpec {
    return this._spec.getValue();
  }

  public update (spec: DetailedTargetingSpec) {
    this._spec.next(spec);
  }

  constructor () { }

  public updateWithSelectedItems (items: DetailedTargetingItem[]) {
    let detailedTargeting = {};

    items.forEach((item: DetailedTargetingItem) => {
      detailedTargeting[item.type] = detailedTargeting[item.type] || [];
      detailedTargeting[item.type].push(item.id);
    });

    // noinspection TypeScriptUnresolvedFunction
    detailedTargeting = Object.assign({}, defaultDetailedTargetingSpec, detailedTargeting);

    this.update(detailedTargeting);
  }

}
