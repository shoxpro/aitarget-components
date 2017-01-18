import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class AudienceActions {
  static SET_EDIT_AUDIENCE_INDEX   = '[audience] Edit Audience';
  static SET_UPDATE_AUDIENCE_INDEX = '[audience] Update Audience';

  setEditAudienceIndex (index: number): Action {
    return {
      type:    AudienceActions.SET_EDIT_AUDIENCE_INDEX,
      payload: {index}
    };
  }

  setUpdateAudienceIndex (index: number): Action {
    return {
      type:    AudienceActions.SET_UPDATE_AUDIENCE_INDEX,
      payload: {index}
    };
  }
}
