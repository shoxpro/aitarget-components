import { Injectable } from '@angular/core';
import { FbService } from '../../fb/fb.service';
import { DetailedTargetingDropdownSuggestedService } from '../detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';

@Injectable()
export class DetailedTargetingApiService {

  constructor (private FbService: FbService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private DetailedTargetingDropdownSuggestedService: DetailedTargetingDropdownSuggestedService,
               private DetailedTargetingModeService: DetailedTargetingModeService) {}

  search (q: string, adaccountId = 'act_944874195534529') {
    if (!q) {
      this.DetailedTargetingInfoService.update(null);
      this.DetailedTargetingModeService.set(null);
      return this.DetailedTargetingDropdownSuggestedService.updateDropdown([]);
    }
    this.DetailedTargetingModeService.set('suggested');
    this.FbService.get((FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {q: q}, (response) => {
        this.DetailedTargetingDropdownSuggestedService.updateDropdown(response.data);
      });
    });
  }

}
