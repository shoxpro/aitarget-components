/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';

describe('Service: GeoTargetingDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingDropdownService]
    });
  });

  it('should ...', inject([GeoTargetingDropdownService], (service: GeoTargetingDropdownService) => {
    expect(service).toBeTruthy();
  }));
});
