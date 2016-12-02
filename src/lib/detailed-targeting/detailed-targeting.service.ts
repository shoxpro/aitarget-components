import { Injectable } from '@angular/core';
import { DetailedTargetingSpec } from '../targeting/interfaces/targeting-spec-detailed.interface';
import { BehaviorSubject } from 'rxjs';
import { defaultDetailedTargetingSpec } from '../targeting/interfaces/targeting-spec-detailed.const';
import { DetailedTargetingItem } from './detailed-targeting-item';

@Injectable()
export class DetailedTargetingService {

  _spec = new BehaviorSubject<DetailedTargetingSpec>(defaultDetailedTargetingSpec);
  spec  = this._spec.asObservable();

  get (): DetailedTargetingSpec {
    return this._spec.getValue();
  }

  update (spec: DetailedTargetingSpec) {
    this._spec.next(spec);
  }

  constructor () { }

  updateWithSelectedItems (items: DetailedTargetingItem[]) {
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
