/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { FbService } from '../../fb/fb.service';
import { DetailedTargetingDropdownSuggestedService } from '../detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingDropdownBrowseService } from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { FB } from '../../fb/fb.interface';
import { Subject } from 'rxjs';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
/* tslint:enable:max-line-length */

@Injectable()
export class DetailedTargetingApiService {

  _defaultLang: string = 'en_US';
  lang: string         = this._defaultLang;

  suggestedTargetingList = [];

  api = this.fbService.api
            .filter((FB: FB) => Boolean(FB));
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
    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {q: q, locale: this.lang}, (response) => {
        this.detailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  browse (adaccountId = this.adaccountId) {
    this.api.subscribe((FB: FB) => {
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
    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsuggestions`, {
        targeting_list: targetingList,
        locale:         this.lang
      }, (response) => {
        this.detailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  validate (targetingList: Array<Object> = [], adaccountId = this.adaccountId) {
    let _response = new Subject<DetailedTargetingItem[]>();

    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingvalidation`, {
        targeting_list: targetingList,
        locale:         this.lang
      }, (response) => {
        _response.next(response.data);
      });
    });

    return _response.asObservable();
  };

  filteredSearch (q: string, limitType: string, adaccountId = this.adaccountId) {
    let _response = new Subject<DetailedTargetingItem[]>();

    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {
        q:          q,
        limit_type: limitType,
        locale:     this.lang
      }, (response) => {
        _response.next(response.data);
      });
    });

    return _response.asObservable();
  };

}
