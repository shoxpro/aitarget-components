/* tslint:disable:no-unused-variable */

import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingSelectedComponent } from './detailed-targeting-selected.component';
import { TargetingSpecService } from '../../targeting/targeting-spec.service';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingDropdownBrowseService } from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';

describe('Component: DetailedTargetingSelected', () => {
  it('should create an instance', () => {
    inject([TargetingSpecService,
      DetailedTargetingDropdownBrowseService,
      DetailedTargetingModeService,
      DetailedTargetingSelectedService], (TargetingSpecService, DetailedTargetingDropdownBrowseService, DetailedTargetingModeService, DetailedTargetingSelectedService) => {
      this.component = new DetailedTargetingSelectedComponent(TargetingSpecService, DetailedTargetingDropdownBrowseService, DetailedTargetingModeService, DetailedTargetingSelectedService);
      expect(this.component)
        .toBeTruthy();
    });
  });
});
