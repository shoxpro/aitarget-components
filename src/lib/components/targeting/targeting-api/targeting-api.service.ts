import { Injectable } from '@angular/core';
import { SDK } from '../../../shared/sdk/sdk.interface';
import { TranslateService, LangChangeEvent } from 'ng2-translate/src/translate.service';
import { SdkService } from '../../../shared/sdk/sdk.service';
import { Observable } from 'rxjs/Observable';
import { TargetingSpec } from '../interfaces/targeting-spec.interface';
import { SdkError } from '../../../shared/errors/sdkError';

@Injectable()
export class TargetingApiService {

  _defaultLang: string = 'en_US';
  lang: string         = this._defaultLang;

  adaccountId: string;

  get sdk (): Observable<SDK> {
    return this.fbService.sdk
               .filter((FB: SDK) => Boolean(FB))
               .take(1);
  }

  constructor (private fbService: SdkService,
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
    return this.sdk.switchMap((FB: SDK) => {
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
    return this.sdk.switchMap((FB: SDK) => {
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
