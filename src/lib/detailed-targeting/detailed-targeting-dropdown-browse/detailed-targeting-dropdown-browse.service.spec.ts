/* tslint:disable:no-unused-variable */

import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse.service';

describe('DetailedTargetingDropdownBrowse Service', () => {
  beforeEachProviders(() => [DetailedTargetingDropdownBrowseService]);

  it('should ...',
    inject([DetailedTargetingDropdownBrowseService], (service: DetailedTargetingDropdownBrowseService) => {
      expect(service)
        .toBeTruthy();
    }));
});
