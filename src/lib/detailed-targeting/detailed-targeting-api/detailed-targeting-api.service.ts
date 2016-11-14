/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { FbService } from '../../fb/fb.service';
import { DetailedTargetingDropdownSuggestedService } from '../detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingDropdownBrowseService } from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { FB } from '../../fb/fb.interface';
import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
import { SdkError } from '../../shared/errors/sdkError';
/* tslint:enable:max-line-length */

@Injectable()
export class DetailedTargetingApiService {

  _defaultLang: string = 'en_US';
  lang: string         = this._defaultLang;

  suggestedTargetingList = [];

  get sdk (): Observable<FB> {
    return this.fbService.sdk
               .filter((FB: FB) => Boolean(FB))
               .take(1);
  }

  adaccountId;

  constructor (private fbService: FbService,
               private detailedTargetingDropdownSuggestedService: DetailedTargetingDropdownSuggestedService,
               private detailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
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

  search (q: string, adaccountId = this.adaccountId) {
    this.sdk.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {q: q, locale: this.lang}, (response) => {
        this.detailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  browse (adaccountId = this.adaccountId) {
    this.sdk.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingbrowse`, {
        include_headers: false,
        include_nodes:   true,
        fields:          [
          'id', 'name', 'type',
          'path', 'audience_size', 'key',
          'parent', 'info', 'info_title',
          'img', 'link'],
        locale:          this.lang
      }, (response) => {
        this.detailedTargetingDropdownBrowseService.updateDropdown(response.data);
      });
    });
  };

  suggest (targetingList: Array<Object> = this.suggestedTargetingList, adaccountId = this.adaccountId) {
    this.suggestedTargetingList = targetingList;
    this.sdk.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsuggestions`, {
        targeting_list: targetingList,
        locale:         this.lang
      }, (response) => {
        this.detailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  validate (targetingList: Array<Object> = [], adaccountId = this.adaccountId) {
    return this.sdk.switchMap((FB: FB) => Observable.create((observer) => {
        FB.api(`/${adaccountId}/targetingvalidation`, {
          targeting_list: targetingList,
          locale:         this.lang
        }, (response) => {
          if (response.error) {
            observer.error(new SdkError(response.error));
          } else {
            observer.next(response.data);
            observer.complete();
          }
        });
      })
    );
  };

  filteredSearch (q: string, limitType: string, adaccountId = this.adaccountId) {
    return this.sdk.switchMap((FB: FB) => Observable.create((observer) => {
        FB.api(`/${adaccountId}/targetingsearch`, {
          q:          q,
          limit_type: limitType,
          locale:     this.lang
        }, (response) => {
          if (response.error) {
            observer.error(new SdkError(response.error));
          } else {
            observer.next(response.data);
            observer.complete();
          }
        });
      })
    );
  };

}
