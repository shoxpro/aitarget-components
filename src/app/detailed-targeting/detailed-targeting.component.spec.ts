/* tslint:disable:no-unused-variable */

import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingComponent } from './detailed-targeting.component';
import { DetailedTargetingApiService } from './detailed-targeting-api/detailed-targeting-api.service';

describe('Component: DetailedTargeting', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingApiService], (DetailedTargetingApiService) => {
      this.component = new DetailedTargetingComponent(DetailedTargetingApiService);
      expect(this.component)
        .toBeTruthy();
    });
  });
});
