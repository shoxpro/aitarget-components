import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class TargetingActions {
  static SET_EDIT_AUDIENCE_INDEX = '[targeting] Set Edit Audience Index';

  setEditAudienceIndex (index: number | null): Action {
    return {
      type:    TargetingActions.SET_EDIT_AUDIENCE_INDEX,
      payload: {index}
    };
  }
}
