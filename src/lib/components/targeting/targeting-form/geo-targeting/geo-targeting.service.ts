import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { AppState } from '../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingActions } from './geo-targeting.actions';
import { GeoTargetingInfoService } from './geo-targeting-info/geo-targeting-info.service';
import { TranslateService } from 'ng2-translate';
import { GEO_LIMITS } from './geo-targeting.constants';

@Injectable()
export class GeoTargetingService {

  clickOutsideOfComponent$ = new Subject();

  init () {
    this._store.dispatch(this.geoTargetingActions.init());
  }

  destroy () {
    this._store.dispatch(this.geoTargetingActions.destroy());
  }

  /**
   * Show notification that some locations exceed its limit
   * @param mode
   * @param type
   * @param limit
   */
  informAboutOverLimit (mode, type, limit) {
    this.geoTargetingInfoService.showInfo({
      level:   'error',
      message: this.translateService.instant(`geo-targeting-info.LIMIT`, {
        type:  this.translateService.instant(`geo-targeting-dropdown.${type}_many`),
        mode:  this.translateService.instant(`geo-targeting-mode.${mode}_past`),
        limit: limit
      })
    });
  }

  /**
   * Process and inform about over limit
   * @param isWithinLimit
   */
  processOverLimit (isWithinLimit) {
    for (let mode in isWithinLimit) {
      if (isWithinLimit.hasOwnProperty(mode)) {
        for (let type in isWithinLimit[mode]) {
          if (isWithinLimit[mode].hasOwnProperty(type)) {
            if (!isWithinLimit[mode][type]) {
              return this.informAboutOverLimit(mode, type, GEO_LIMITS[type]);
            }
          }
        }
      }
    }
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private translateService: TranslateService,
               private geoTargetingActions: GeoTargetingActions) { }

}
