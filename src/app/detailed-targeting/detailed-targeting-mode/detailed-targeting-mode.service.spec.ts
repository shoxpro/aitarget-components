/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DetailedTargetingModeService } from './detailed-targeting-mode.service';

describe('DetailedTargetingMode Service', () => {
  beforeEachProviders(() => [DetailedTargetingModeService]);

  it('should ...',
      inject([DetailedTargetingModeService], (service: DetailedTargetingModeService) => {
    expect(service).toBeTruthy();
  }));
});
