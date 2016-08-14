/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested.service';

describe('DetailedTargetingDropdownSuggested Service', () => {
  beforeEachProviders(() => [DetailedTargetingDropdownSuggestedService]);

  it('should ...',
      inject([DetailedTargetingDropdownSuggestedService], (service: DetailedTargetingDropdownSuggestedService) => {
    expect(service).toBeTruthy();
  }));
});
