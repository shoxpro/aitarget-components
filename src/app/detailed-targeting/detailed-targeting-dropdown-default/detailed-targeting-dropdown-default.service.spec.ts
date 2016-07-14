/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DetailedTargetingDropdownDefaultService } from './detailed-targeting-dropdown-default.service';

describe('DetailedTargetingDropdownDefault Service', () => {
  beforeEachProviders(() => [DetailedTargetingDropdownDefaultService]);

  it('should ...',
      inject([DetailedTargetingDropdownDefaultService], (service: DetailedTargetingDropdownDefaultService) => {
    expect(service).toBeTruthy();
  }));
});
