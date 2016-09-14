import { Injectable } from '@angular/core';
import { FbService } from '../../fb/fb.service';
import { DetailedTargetingDropdownSuggestedService } from '../detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingDropdownBrowseService } from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { FB } from '../../fb/fb.interface';
import { Subject } from 'rxjs';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';

@Injectable()
export class DetailedTargetingApiService {

  private _defaultLang: string = 'en_US';
  private lang: string         = this._defaultLang;

  private suggestedTargetingList = [];

  private api = this.FbService.api
                    .filter((FB: FB) => Boolean(FB));
  private adaccountId;

  constructor (private FbService: FbService,
               private DetailedTargetingDropdownSuggestedService: DetailedTargetingDropdownSuggestedService,
               private DetailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
               private TranslateService: TranslateService) {
    this.TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  /**
   * Set adaccount id to be used for api calls
   * @param adaccountId
   */
  public setAdaccount (adaccountId) {
    this.adaccountId = adaccountId;
  };

  public search (q: string, adaccountId = this.adaccountId) {
    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {q: q, locale: this.lang}, (response) => {
        this.DetailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  public browse (adaccountId = this.adaccountId) {
    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingbrowse`, {
        include_headers: false,
        include_nodes:   true,
        fields:          [
          "id", "name", "type",
          "path", "audience_size", "key",
          "parent", "info", "info_title",
          "img", "link"],
        locale:          this.lang
      }, (response) => {
        this.DetailedTargetingDropdownBrowseService.updateDropdown(response.data);
      });
    });
  };

  public suggest (targetingList: Array<Object> = this.suggestedTargetingList, adaccountId = this.adaccountId) {
    this.suggestedTargetingList = targetingList;
    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsuggestions`, {
        targeting_list: targetingList,
        locale:         this.lang
      }, (response) => {
        this.DetailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  public validate (targetingList: Array<Object> = [], adaccountId = this.adaccountId) {
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

  public filteredSearch (q: string, limit_type: string, adaccountId = this.adaccountId) {
    let _response = new Subject<DetailedTargetingItem[]>();

    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {
        q:          q,
        limit_type: limit_type,
        locale:     this.lang
      }, (response) => {
        _response.next(response.data);
      });
    });

    return _response.asObservable();
  };

}
