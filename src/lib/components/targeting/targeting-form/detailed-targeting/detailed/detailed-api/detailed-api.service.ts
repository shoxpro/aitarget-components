/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { DetailedDropdownSuggestedService } from '../detailed-dropdown-suggested/detailed-dropdown-suggested.service';
import { DetailedDropdownBrowseService } from '../detailed-dropdown-browse/detailed-dropdown-browse.service';
import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
import { SDK } from '../../../../../../shared/sdk/sdk.interface';
import { SdkService } from '../../../../../../shared/sdk/sdk.service';
import { SdkError } from '../../../../../../shared/errors/sdkError';
/* tslint:enable:max-line-length */

@Injectable()
export class DetailedApiService {

  _defaultLang: string = 'en_US';
  lang: string         = this._defaultLang;

  suggestedTargetingList = [];

  get sdk (): Observable<SDK> {
    return this.fbService.sdk
               .filter((FB: SDK) => Boolean(FB))
               .take(1);
  }

  adaccountId;

  constructor (private fbService: SdkService,
               private detailedDropdownSuggestedService: DetailedDropdownSuggestedService,
               private detailedDropdownBrowseService: DetailedDropdownBrowseService,
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
    this.sdk.subscribe((FB: SDK) => {
      FB.api(`/${adaccountId}/targetingsearch`, {q: q, locale: this.lang}, (response) => {
        this.detailedDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  browse (adaccountId = this.adaccountId) {
    this.sdk.subscribe((FB: SDK) => {
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
        this.detailedDropdownBrowseService.updateDropdown(response.data);
      });
    });
  };

  suggest (targetingList: Array<Object> = this.suggestedTargetingList, adaccountId = this.adaccountId) {
    this.suggestedTargetingList = targetingList;
    this.sdk.subscribe((FB: SDK) => {
      FB.api(`/${adaccountId}/targetingsuggestions`, {
        targeting_list: targetingList,
        locale:         this.lang
      }, (response) => {
        this.detailedDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  validate (targetingList: Array<Object> = [], adaccountId = this.adaccountId) {
    return this.sdk.switchMap((FB: SDK) => Observable.create((observer) => {
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
    return this.sdk.switchMap((FB: SDK) => Observable.create((observer) => {
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
