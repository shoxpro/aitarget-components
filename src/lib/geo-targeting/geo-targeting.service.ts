import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { AppState } from '../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingActions } from './geo-targeting.actions';

@Injectable()
export class GeoTargetingService {

  clickOutsideOfComponent$ = new Subject();

  init () {
    this._store.dispatch(this.geoTargetingActions.init());
  }

  destroy () {
    this._store.dispatch(this.geoTargetingActions.destroy());
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingActions: GeoTargetingActions) { }

}
