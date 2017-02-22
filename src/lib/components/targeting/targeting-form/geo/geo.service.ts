import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AppState } from '../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoActions } from './geo.actions';
import { GeoInfoService } from './geo-info/geo-info.service';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { GEO_LIMITS } from './geo.constants';

@Injectable()
export class GeoService {

  fbaClickOutsideOfComponent$ = new Subject();

  init () {
    this._store.dispatch(this.geoActions.init());
  }

  destroy () {
    this._store.dispatch(this.geoActions.destroy());
  }

  /**
   * Show notification that some locations exceed its limit
   * @param mode
   * @param type
   * @param limit
   */
  informAboutOverLimit (mode, type, limit) {
    this.geoInfoService.showInfo({
      level:   'error',
      message: this.translateService.instant(`fba-geo-info.LIMIT`, {
        type:  this.translateService.instant(`fba-geo-dropdown.${type}_many`),
        mode:  this.translateService.instant(`fba-geo-mode.${mode}_past`),
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
               private geoInfoService: GeoInfoService,
               private translateService: TranslateService,
               private geoActions: GeoActions) { }

}
