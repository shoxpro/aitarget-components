/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DetailedTargetingInputService } from './detailed-targeting-input.service';

describe('DetailedTargetingInput Service', () => {
  beforeEachProviders(() => [DetailedTargetingInputService]);

  it('should ...',
      inject([DetailedTargetingInputService], (service: DetailedTargetingInputService) => {
    expect(service).toBeTruthy();
  }));
});
