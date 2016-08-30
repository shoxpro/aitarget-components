/* tslint:disable:no-unused-variable */

import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingInfoService } from './detailed-targeting-info.service';

describe('DetailedTargetingInfo Service', () => {
  beforeEachProviders(() => [DetailedTargetingInfoService]);

  it('should ...',
    inject([DetailedTargetingInfoService], (service: DetailedTargetingInfoService) => {
      expect(service).toBeTruthy();
    }));
});
