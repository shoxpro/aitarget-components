import { Injectable } from '@angular/core';
import { AppState } from '../../app/reducers/index';
import { Store } from '@ngrx/store';
import { TargetingActions } from './targeting.actions';
import { TARGETING_KEY, TargetingState } from './targeting.reducer';
import { Observable } from 'rxjs';

@Injectable()
export class TargetingService {

  static getModel (_store): Observable<TargetingState> {
    return _store.select(TARGETING_KEY)
                 .distinctUntilChanged();
  };

  setEditAudienceIndex (index: number | null) {
    this._store.dispatch(this.targetingActions.setEditAudienceIndex(index));
  }

  constructor (private _store: Store<AppState>,
               private targetingActions: TargetingActions) {}
}
