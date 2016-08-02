/* tslint:disable:no-unused-variable */

import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingApiService } from './detailed-targeting-api.service';
import { DetailedTargetingDropdownSuggestedService } from '../detailed-targeting-dropdown-suggested/detailed-targeting-dropdown-suggested.service';
import { FbService } from '../../fb/fb.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';

describe('DetailedTargetingApi Service', () => {
  beforeEachProviders(() => [DetailedTargetingApiService, DetailedTargetingInfoService, FbService,
    DetailedTargetingDropdownSuggestedService, DetailedTargetingModeService]);

  it('should ...',
    inject([DetailedTargetingApiService], (service: DetailedTargetingApiService) => {
      expect(service)
        .toBeTruthy();
    }));
});
