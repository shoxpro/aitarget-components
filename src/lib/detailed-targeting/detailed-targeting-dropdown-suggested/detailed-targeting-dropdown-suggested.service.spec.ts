/* tslint:disable:no-unused-variable */

//noinspection TypeScriptCheckImport
import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested.service';

describe('DetailedTargetingDropdownSuggested Service', () => {
  beforeEachProviders(() => [DetailedTargetingDropdownSuggestedService]);

  it('should ...',
    inject([DetailedTargetingDropdownSuggestedService], (service: DetailedTargetingDropdownSuggestedService) => {
      expect(service)
        .toBeTruthy();
    }));
});
