import { Injectable } from '@angular/core';
import { AppState } from '../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { AudienceActions } from './audience.actions';
import { AudienceIndexesState, AUDIENCE_INDEXES_KEY } from './audience.reducer';
import { TARGETING_KEY, TargetingState } from '../targeting.reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AudienceService {
  static getModel (_store): Observable<Array<AudienceIndexesState>> {
    return _store.select(TARGETING_KEY)
                 .map((targeting: TargetingState) => targeting[AUDIENCE_INDEXES_KEY])
                 .distinctUntilChanged();
  };

  setEditAudienceIndex (index: number) {
    this._store.dispatch(this.audienceActions.setEditAudienceIndex(index));
  }

  setUpdateAudienceIndex (index: number) {
    this._store.dispatch(this.audienceActions.setUpdateAudienceIndex(index));
  }

  constructor (private _store: Store<AppState>,
               private audienceActions: AudienceActions) {}
}
