/* tslint:disable:no-unused-variable */

import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingModeService } from './detailed-targeting-mode.service';

describe('DetailedTargetingMode Service', () => {
  beforeEachProviders(() => [DetailedTargetingModeService]);

  it('should ...',
    inject([DetailedTargetingModeService], (service: DetailedTargetingModeService) => {
      expect(service).toBeTruthy();
    }));
});
