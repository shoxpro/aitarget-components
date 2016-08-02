/* tslint:disable:no-unused-variable */

import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingDropdownBrowseComponent } from './detailed-targeting-dropdown-browse.component';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { ChangeDetectorRef } from '@angular/core';

describe('Component: DetailedTargetingDropdownBrowse', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingModeService,
      ChangeDetectorRef], (DetailedTargetingModeService,
                           ChangeDetectorRef) => {
      let component = new DetailedTargetingDropdownBrowseComponent(DetailedTargetingModeService,
        ChangeDetectorRef);
      expect(component)
        .toBeTruthy();
    });
  });
});
