import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/index';
import { GeoTargetingModeActions } from './geo-targeting-mode.actions';
import { GeoTargetingModeType } from './geo-targeting-mode.reducer';

@Injectable()
export class GeoTargetingModeService {

  _mode = new BehaviorSubject<'include'|'exclude'>('include');
  mode  = this._mode.asObservable();

  update (mode) {
    this._mode.next(mode);
  }

  get () {
    return this._mode.getValue();
  }

  setMode (mode: GeoTargetingModeType) {
    this._store.dispatch(this.geoTargetingModeActions.setMode(mode));
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingModeActions: GeoTargetingModeActions) {}

}
