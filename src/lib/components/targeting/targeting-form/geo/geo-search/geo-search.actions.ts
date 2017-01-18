import { Injectable } from '@angular/core';
import { GeoIdService } from '../geo.id';
import { Action } from '@ngrx/store';

@Injectable()
export class GeoSearchActions {
  static PROCESS_INPUT_VALUE = '[geo-search] Process Input Value';
  static UPDATE_MODEL        = '[geo-search] Update Model';

  processInputValue (inputValue): Action {
    return {
      type:    GeoSearchActions.PROCESS_INPUT_VALUE,
      payload: {
        id:         this.geoIdService.id$.getValue(),
        inputValue: inputValue
      }
    };
  }

  updateModel (model): Action {
    return {
      type:    GeoSearchActions.UPDATE_MODEL,
      payload: {
        id:    this.geoIdService.id$.getValue(),
        model: model
      }
    };
  }

  constructor (private geoIdService: GeoIdService) {}
}

