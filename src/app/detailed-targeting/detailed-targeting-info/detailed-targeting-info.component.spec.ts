/* tslint:disable:no-unused-variable */

import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingInfoComponent } from './detailed-targeting-info.component';
import { DetailedTargetingInfoService } from './detailed-targeting-info.service';

describe('Component: DetailedTargetingInfo', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingInfoService], (DetailedTargetingInfoService) => {
      let component = new DetailedTargetingInfoComponent(DetailedTargetingInfoService);
      expect(component)
        .toBeTruthy();
    });
  });
});
