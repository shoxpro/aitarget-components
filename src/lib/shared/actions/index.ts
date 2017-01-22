import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class SharedActions {

  static REVERT = '[Shared Action] Revert';

  revert (revertKeys: Array<string>): Action {
    return {
      type:    SharedActions.REVERT,
      payload: {revertKeys}
    };
  }

}
