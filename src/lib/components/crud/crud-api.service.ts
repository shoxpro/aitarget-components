import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SdkService } from '../../shared/sdk/sdk.service';
import { SDK } from '../../shared/sdk/sdk.interface';
import { SdkError } from '../../shared/errors/sdkError';

@Injectable()
export class CrudApiService {
  adaccountId = 'act_944874195534529';
  locale      = 'en_US';

  get sdk (): Observable<SDK> {
    return this.fbService.sdk
               .filter((FB: SDK) => Boolean(FB))
               .take(1);
  }

  createCampaign (campaign, adaccountId = this.adaccountId) {
    return this.sdk.switchMap((FB: SDK) => {
      return Observable.create((observer) => {
        FB.api(`/${adaccountId}/campaigns`,
          'post',
          Object.assign({}, campaign, {locale: this.locale}),
          (response) => {
            if (response.error) {
              observer.error(new SdkError(response.error));
            } else {
              observer.next(response);
              observer.complete();
            }
          });
      });
    });
  };

  constructor (private fbService: SdkService) {}
}
