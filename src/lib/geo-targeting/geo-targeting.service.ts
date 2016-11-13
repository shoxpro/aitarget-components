import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingActions } from './geo-targeting.actions';

@Injectable()
export class GeoTargetingService {

  bodyClickStream = Observable.fromEvent(window.document.body, 'click')
                              .share();

  clickOutsideOfGeoStream = this.bodyClickStream.map((e: MouseEvent) => {
    let targetElement       = <HTMLElement>e.target;
    let geoTargetingElement = window.document.querySelector('geo-targeting');
    return geoTargetingElement ? !geoTargetingElement.contains(targetElement) : null;
  })
                                .filter((clickedOutside) => clickedOutside === true)
                                .share();

  bodyKeydownStream = Observable.fromEvent(window.document.body, 'keydown');

  escapeStream    = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 27)
                        .share();
  enterStream     = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 13)
                        .share();
  arrowUpStream   = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 38)
                        .share();
  arrowDownStream = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 40)
                        .share();

  init () {
    this._store.dispatch(this.geoTargetingActions.init());
  }

  destroy () {
    this._store.dispatch(this.geoTargetingActions.destroy());
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingActions: GeoTargetingActions) { }

}
