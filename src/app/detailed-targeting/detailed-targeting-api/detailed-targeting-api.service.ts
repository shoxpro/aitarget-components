import { Injectable } from '@angular/core';

import { FbService } from '../../fb/fb.service';
import {
  DetailedTargetingDropdownDefaultService
} from
  '../detailed-targeting-dropdown-default/detailed-targeting-dropdown-default.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';

@Injectable()
export class DetailedTargetingApiService {

  constructor (private FbService: FbService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private DetailedTargetingDropdownDefaultService: DetailedTargetingDropdownDefaultService) {}

  search (q: string, adaccountId = 'act_944874195534529') {
    if (!q) {
      this.DetailedTargetingInfoService.update(null);
      return this.DetailedTargetingDropdownDefaultService.updateDropdown([]);
    }
    this.FbService.get((FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {q: q}, (response) => {
        this.DetailedTargetingDropdownDefaultService.updateDropdown(response.data);
      });
    });
  }

}
