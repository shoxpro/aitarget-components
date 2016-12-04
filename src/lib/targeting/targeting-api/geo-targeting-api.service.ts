import { Injectable } from '@angular/core';
import { FB } from '../../fb/fb.interface';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
import { FbService } from '../../fb/fb.service';
import { Observable } from 'rxjs';
import { TargetingSpec } from '../../targeting/interfaces/targeting-spec.interface';
import { SdkError } from '../../shared/errors/sdkError';

@Injectable()
export class TargetingApiService {

  _defaultLang: string = 'en_US';
  lang: string         = this._defaultLang;

  adaccountId: string;

  get sdk (): Observable<FB> {
    return this.fbService.sdk
               .filter((FB: FB) => Boolean(FB))
               .take(1);
  }

  constructor (private fbService: FbService,
               private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  /**
   * Set adaccount id to be used for api calls
   * @param adaccountId
   */
  setAdaccount (adaccountId) {
    this.adaccountId = adaccountId;
  };

  targetingsentencelines (targetingSpec: TargetingSpec, adaccountId = this.adaccountId) {
    return this.sdk.switchMap((FB: FB) => {
      return Observable.create((observer) => {
        FB.api(`/${adaccountId}/targetingsentencelines`, {
          targeting_spec: targetingSpec,
          locale:         this.lang
        }, (response) => {
          if (response.error) {
            observer.error(new SdkError(response.error));
          } else {
            observer.next(response.targetingsentencelines);
            observer.complete();
          }
        });
      });
    });
  };

  reachestimate (targetingSpec: TargetingSpec, adaccountId = this.adaccountId, optimizeFor = 'IMPRESSIONS') {
    return this.sdk.switchMap((FB: FB) => {
      return Observable.create((observer) => {
        FB.api(`/${adaccountId}/reachestimate`, {
          targeting_spec: targetingSpec,
          optimize_for:   optimizeFor,
          locale:         this.lang
        }, (response) => {
          if (response.error) {
            observer.error(new SdkError(response.error));
          } else {
            observer.next(response.data);
            observer.complete();
          }
        });
      });
    });
  };
}
