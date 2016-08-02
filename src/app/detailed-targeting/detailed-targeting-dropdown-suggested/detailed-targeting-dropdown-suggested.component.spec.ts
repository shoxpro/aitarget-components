/* tslint:disable:no-unused-variable */

import { ChangeDetectorRef } from '@angular/core';
import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingDropdownSuggestedComponent } from './detailed-targeting-dropdown-suggested.component';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested.service';
import { TargetingSpecService } from '../../targeting/targeting-spec.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';

describe('Component: DetailedTargetingDropdownSuggested', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingDropdownSuggestedService,
      DetailedTargetingInfoService,
      TargetingSpecService,
      DetailedTargetingModeService,
      ChangeDetectorRef], (DetailedTargetingDropdownSuggestedService,
                           DetailedTargetingInfoService,
                           TargetingSpecService,
                           DetailedTargetingModeService,
                           ChangeDetectorRef) => {
      let component = new DetailedTargetingDropdownSuggestedComponent(DetailedTargetingDropdownSuggestedService,
        DetailedTargetingInfoService,
        TargetingSpecService,
        DetailedTargetingModeService,
        ChangeDetectorRef);
      expect(component)
        .toBeTruthy();
    });
  });
});
