/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse.service';

describe('DetailedTargetingDropdownBrowse Service', () => {
  beforeEachProviders(() => [DetailedTargetingDropdownBrowseService]);

  it('should ...',
      inject([DetailedTargetingDropdownBrowseService], (service: DetailedTargetingDropdownBrowseService) => {
    expect(service).toBeTruthy();
  }));
});
