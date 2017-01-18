import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AudienceState, audienceInitial } from '../audience/audience.interface';
import { TargetingAudiencesActions } from './targeting-audiences.actions';
import { TARGETING_AUDIENCES_KEY } from './targeting-audiences.reducer';
import { TARGETING_KEY, TargetingState } from '../targeting.reducer';
import { TargetingFormState } from '../targeting-form/targeting-form.reducer';
import { splitFormValue, getSpecFromFormValue } from '../targeting.constants';
import { AppState } from '../../../../app/reducers/index';
import { TargetingApiService } from '../targeting-api/targeting-api.service';

@Injectable()
export class TargetingAudiencesService {

  static getModel (_store): Observable<Array<AudienceState>> {
    return _store.select(TARGETING_KEY)
                 .map((targeting: TargetingState) => targeting[TARGETING_AUDIENCES_KEY])
                 .distinctUntilChanged();
  };

  extendAudience (audience: AudienceState) {
    return this.targetingApiService.targetingsentencelines(audience.spec)
               .map((targetingsentencelines) => Object.assign(audience, {targetingsentencelines}))
               .switchMap((extendedAudience) => {
                 return this.targetingApiService.reachestimate(audience.spec)
                            .map((reachestimate) => Object.assign(extendedAudience, {reachestimate}));
               })
               .take(1);
  }

  setAudiences (formValue: TargetingFormState) {
    Observable.forkJoin(
      splitFormValue(formValue)
        .map((audienceFormValue, index) => {
          const spec = getSpecFromFormValue(audienceFormValue);
          return Object.assign({}, audienceInitial, {
            formValue: audienceFormValue,
            spec:      spec,
            name:      `Audience ${index + 1}`
          });
        })
        .map((audience) => this.extendAudience(audience))
    )
              .subscribe((audiences) => {
                this._store.dispatch(this.targetingAudiencesActions.setAudiences(audiences));
              });
  }

  updateAudience (index: number, audience: AudienceState) {
    this._store.dispatch(this.targetingAudiencesActions.updateAudience(index, audience));
  }

  constructor (private _store: Store<AppState>,
               private targetingApiService: TargetingApiService,
               private targetingAudiencesActions: TargetingAudiencesActions) {}
}
