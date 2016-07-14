import { Injectable } from '@angular/core';

import { FbService } from '../../fb/fb.service';
import {
  DetailedTargetingDropdownDefaultService
} from
  '../detailed-targeting-dropdown-default/detailed-targeting-dropdown-default.service';

@Injectable()
export class DetailedTargetingApiService {

  constructor (private FbService: FbService,
               private DetailedTargetingDropdownDefaultService: DetailedTargetingDropdownDefaultService) {}

  search (q: string, adaccountId = 'act_944874195534529') {
    if (!q) {
      return this.DetailedTargetingDropdownDefaultService.updateDropdown([]);
    }
    this.FbService.get((FB) => {
      FB.api(`/${adaccountId}/targetingsearch`, {q: q}, (response) => {
        this.DetailedTargetingDropdownDefaultService.updateDropdown(response.data);
      });
    });
  }

}
