/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingModeService } from './geo-targeting-mode.service';

describe('Service: GeoTargetingMode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingModeService]
    });
  });

  it('should ...', inject([GeoTargetingModeService], (service: GeoTargetingModeService) => {
    expect(service)
      .toBeTruthy();
  }));
});
