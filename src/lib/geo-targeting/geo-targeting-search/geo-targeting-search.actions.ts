import { Injectable } from '@angular/core';

@Injectable()
export class GeoTargetingSearchActions {
  static PROCESS_INPUT_VALUE = '[GeoTargetingSearchState] Process Input Value';
  static UPDATE_MODEL        = '[GeoTargetingSearchState] Update Model';

  processInputValue (inputValue) {
    return {
      type:    GeoTargetingSearchActions.PROCESS_INPUT_VALUE,
      payload: {inputValue}
    };
  }

  updateModel (model) {
    return {
      type:    GeoTargetingSearchActions.UPDATE_MODEL,
      payload: {model}
    };
  }

  constructor () {}
}

