import { Injectable } from '@angular/core';
import { AudienceState } from '../audience/audience.interface';
import { Action } from '@ngrx/store';

@Injectable()
export class TargetingAudiencesActions {
  static SET_AUDIENCES   = '[targeting-audiences] Set Audiences';
  static UPDATE_AUDIENCE = '[targeting-audiences] Update Audience';

  setAudiences (audiences: Array<AudienceState>): Action {
    return {
      type:    TargetingAudiencesActions.SET_AUDIENCES,
      payload: {audiences}
    };
  }

  updateAudience (index: number, audience: AudienceState): Action {
    return {
      type:    TargetingAudiencesActions.UPDATE_AUDIENCE,
      payload: {index, audience}
    };
  }
}
