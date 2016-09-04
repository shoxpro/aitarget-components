/* tslint:disable:no-unused-variable */

import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected.service';

describe('DetailedTargetingSelected Service', () => {
  beforeEachProviders(() => [DetailedTargetingSelectedService]);

  it('should ...',
    inject([DetailedTargetingSelectedService], (service: DetailedTargetingSelectedService) => {
      expect(service)
        .toBeTruthy();
    }));
});
