import { Injectable } from '@angular/core';
import { FbService } from '../../fb/fb.service';
import { DetailedTargetingDropdownSuggestedService } from '../detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingDropdownBrowseService } from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';

@Injectable()
export class DetailedTargetingApiService {

  constructor (private FbService: FbService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private DetailedTargetingDropdownSuggestedService: DetailedTargetingDropdownSuggestedService,
               private DetailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
               private DetailedTargetingModeService: DetailedTargetingModeService) {}

  search (q: string, adaccountId: string = 'act_944874195534529') {
    this.FbService.api.subscribe((FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {q: q}, (response) => {
        this.DetailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  }

  browse (adaccountId: string = 'act_944874195534529') {
    this.FbService.api.subscribe((FB) => {
      FB.api(`/${adaccountId}/targetingbrowse`, {
        include_headers: false,
        include_nodes: true
      }, (response) => {
        this.DetailedTargetingDropdownBrowseService.updateDropdown(response.data);
      });
    });
  }

  suggest (targetingList: Array<Object> = [], adaccountId: string = 'act_944874195534529') {
    this.FbService.api.subscribe((FB) => {
      FB.api(`/${adaccountId}/targetingsuggestions`, {
        targeting_list: targetingList
      }, (response) => {
        this.DetailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  }

}
