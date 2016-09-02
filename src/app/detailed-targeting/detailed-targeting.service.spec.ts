/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DetailedTargetingService } from './detailed-targeting.service';

describe('Service: DetailedTargeting', () => {
  beforeEach(() => {
    addProviders([DetailedTargetingService]);
  });

  it('should ...',
    inject([DetailedTargetingService],
      (service: DetailedTargetingService) => {
        expect(service).toBeTruthy();
      }));
});
