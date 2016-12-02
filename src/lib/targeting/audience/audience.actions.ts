import { Injectable } from '@angular/core';
import { AudienceState } from './audience.reducer';
import { Action } from '@ngrx/store';

@Injectable()
export class AudienceActionsService {

  static UPDATE = '[audience] Update';

  update (audience: AudienceState): Action {
    return {
      type:    AudienceActionsService.UPDATE,
      payload: {audience}
    };
  }

}
