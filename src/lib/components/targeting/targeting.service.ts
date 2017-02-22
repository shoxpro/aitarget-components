import { Injectable } from '@angular/core';
import { TARGETING_KEY, TargetingState } from './targeting.reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TargetingService {

  static getModel (_store): Observable<TargetingState> {
    return _store.select(TARGETING_KEY)
                 .distinctUntilChanged();
  };
}
