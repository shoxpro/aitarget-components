/* tslint:disable:no-unused-variable */

import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingInputComponent } from './detailed-targeting-input.component';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';

describe('Component: DetailedTargetingInput', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingApiService,
      DetailedTargetingModeService], (DetailedTargetingApiService, DetailedTargetingModeService) => {
      let component = new DetailedTargetingInputComponent(DetailedTargetingApiService, DetailedTargetingModeService);
      expect(component)
        .toBeTruthy();
    });
  });
});
