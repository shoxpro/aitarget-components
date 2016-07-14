/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { TargetingSpecService } from './targeting-spec.service';

describe('TargetingSpec Service', () => {
  beforeEachProviders(() => [TargetingSpecService]);

  it('should ...',
      inject([TargetingSpecService], (service: TargetingSpecService) => {
    expect(service).toBeTruthy();
  }));
});
