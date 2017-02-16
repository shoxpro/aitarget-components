import { Injectable } from '@angular/core';
import { TargetingFormActions } from './targeting-form.actions';
import { TargetingFormState, TARGETING_FORM_KEY } from './targeting-form.reducer';
import { AppState } from '../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TargetingState, TARGETING_KEY } from '../targeting.reducer';

@Injectable()
export class TargetingFormService {

  static getModel (_store): Observable<TargetingFormState> {
    return _store.select(TARGETING_KEY)
                 .map((targeting: TargetingState) => targeting[TARGETING_FORM_KEY])
                 .distinctUntilChanged();
  };

  setFormValue (formValue: TargetingFormState) {
    this._store.dispatch(this.targetingFormActions.setFormValue(formValue));
  }

  constructor (private _store: Store<AppState>,
               private targetingFormActions: TargetingFormActions) {}
}
