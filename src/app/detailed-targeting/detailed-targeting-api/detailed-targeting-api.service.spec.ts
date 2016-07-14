/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DetailedTargetingApiService } from './detailed-targeting-api.service';
import {
  DetailedTargetingDropdownDefaultService
}
  from '../detailed-targeting-dropdown-default/detailed-targeting-dropdown-default.service';
import { FbService } from '../../fb/fb.service';

describe('DetailedTargetingApi Service', () => {
  beforeEachProviders(() => [DetailedTargetingApiService, FbService, DetailedTargetingDropdownDefaultService]);

  it('should ...',
    inject([DetailedTargetingApiService], (service: DetailedTargetingApiService) => {
      expect(service)
        .toBeTruthy();
    }));
});
