/* tslint:disable:no-unused-variable */

import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingDropdownBrowseComponent } from './detailed-targeting-dropdown-browse.component';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { ChangeDetectorRef } from '@angular/core';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';

describe('Component: DetailedTargetingDropdownBrowse', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingDropdownBrowseService, DetailedTargetingApiService, DetailedTargetingModeService,
      DetailedTargetingSelectedService, DetailedTargetingInfoService,
      ChangeDetectorRef], (DetailedTargetingDropdownBrowseService, DetailedTargetingApiService, DetailedTargetingModeService,
                           DetailedTargetingSelectedService, DetailedTargetingInfoService, ChangeDetectorRef) => {
      let component = new DetailedTargetingDropdownBrowseComponent(DetailedTargetingDropdownBrowseService, DetailedTargetingApiService, DetailedTargetingModeService,
        DetailedTargetingSelectedService, DetailedTargetingInfoService,
        ChangeDetectorRef);
      expect(component)
        .toBeTruthy();
    });
  });
});
