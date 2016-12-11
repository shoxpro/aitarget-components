import { Injectable } from '@angular/core';
import { GeoTargetingIdService } from '../geo-targeting.id';
import { Action } from '@ngrx/store';

@Injectable()
export class GeoTargetingSearchActions {
  static PROCESS_INPUT_VALUE = '[geo-targeting-search] Process Input Value';
  static UPDATE_MODEL        = '[geo-targeting-search] Update Model';

  processInputValue (inputValue): Action {
    return {
      type:    GeoTargetingSearchActions.PROCESS_INPUT_VALUE,
      payload: {
        id:         this.geoTargetingIdService.id$.getValue(),
        inputValue: inputValue
      }
    };
  }

  updateModel (model): Action {
    return {
      type:    GeoTargetingSearchActions.UPDATE_MODEL,
      payload: {
        id:    this.geoTargetingIdService.id$.getValue(),
        model: model
      }
    };
  }

  constructor (private geoTargetingIdService: GeoTargetingIdService) {}
}

