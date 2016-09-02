import { Injectable } from '@angular/core';
import { FbService } from '../../fb/fb.service';
import { DetailedTargetingDropdownSuggestedService } from '../detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingDropdownBrowseService } from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { FB } from '../../fb/fb.interface';
import { Subject } from 'rxjs';
import { DetailedTargetingItem } from '../detailed-targeting-item';

@Injectable()
export class DetailedTargetingApiService {

  private api = this.FbService.api
    .filter((FB: FB) => Boolean(FB));

  constructor (private FbService: FbService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private DetailedTargetingDropdownSuggestedService: DetailedTargetingDropdownSuggestedService,
               private DetailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
               private DetailedTargetingModeService: DetailedTargetingModeService) {}

  public search (q: string, adaccountId = 'act_944874195534529') {
    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, { q: q }, (response) => {
        this.DetailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  public browse (adaccountId = 'act_944874195534529') {
    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingbrowse`, {
        include_headers: false,
        include_nodes:   true
      }, (response) => {
        this.DetailedTargetingDropdownBrowseService.updateDropdown(response.data);
      });
    });
  };

  public suggest (targetingList: Array<Object> = [], adaccountId = 'act_944874195534529') {
    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingsuggestions`, {
        targeting_list: targetingList
      }, (response) => {
        this.DetailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  };

  public validate (targetingList: Array<Object> = [], adaccountId = 'act_944874195534529') {
    let _response = new Subject<DetailedTargetingItem[]>();

    this.api.subscribe((FB: FB) => {
      FB.api(`/${adaccountId}/targetingvalidation`, {
        targeting_list: targetingList
      }, (response) => {
        _response.next(response.data);
      });
    });

    return _response.asObservable();
  };

}
