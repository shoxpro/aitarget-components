import { Injectable } from '@angular/core';
import { DetailedSpec } from '../../../interfaces/targeting-spec-detailed.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { detailedSpecInitial } from '../../../interfaces/targeting-spec-detailed.interface';
import { DetailedItem } from './detailed-item';

@Injectable()
export class DetailedService {

  _spec = new BehaviorSubject<DetailedSpec>(detailedSpecInitial);
  spec  = this._spec.asObservable();

  get (): DetailedSpec {
    return this._spec.getValue();
  }

  update (spec: DetailedSpec) {
    this._spec.next(spec);
  }
  updateWithSelectedItems (items: DetailedItem[]) {
    let detailed = {};

    items.forEach((item: DetailedItem) => {
      detailed[item.type] = detailed[item.type] || [];
      detailed[item.type].push(item.id);
    });

    // noinspection TypeScriptUnresolvedFunction
    detailed = Object.assign({}, detailedSpecInitial, detailed);

    this.update(detailed);
  }

}
