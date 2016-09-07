/* tslint:disable:no-unused-variable */

import { ChangeDetectorRef } from '@angular/core';
import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingDropdownSuggestedComponent } from './detailed-targeting-dropdown-suggested.component';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested.service';
import { TargetingSpecService } from '../../targeting/targeting-spec.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingInputService } from '../detailed-targeting-input/detailed-targeting-input.service';

describe('Component: DetailedTargetingDropdownSuggested', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingDropdownSuggestedService,
      DetailedTargetingInfoService,
      TargetingSpecService,
      DetailedTargetingModeService,
      DetailedTargetingApiService,
      DetailedTargetingInputService,
      ChangeDetectorRef], (DetailedTargetingDropdownSuggestedService,
                           DetailedTargetingInfoService,
                           TargetingSpecService,
                           DetailedTargetingModeService,
                           DetailedTargetingApiService,
                           DetailedTargetingInputService,
                           ChangeDetectorRef) => {
      let component = new DetailedTargetingDropdownSuggestedComponent(DetailedTargetingDropdownSuggestedService,
        DetailedTargetingInfoService,
        TargetingSpecService,
        DetailedTargetingModeService,
        DetailedTargetingApiService,
        DetailedTargetingInputService,
        ChangeDetectorRef);
      expect(component)
        .toBeTruthy();
    });
  });
});
