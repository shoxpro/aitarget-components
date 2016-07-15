/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DetailedTargetingInfoService } from './detailed-targeting-info.service';

describe('DetailedTargetingInfo Service', () => {
  beforeEachProviders(() => [DetailedTargetingInfoService]);

  it('should ...',
      inject([DetailedTargetingInfoService], (service: DetailedTargetingInfoService) => {
    expect(service).toBeTruthy();
  }));
});
