/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingService } from './geo-targeting.service';

describe('Service: GeoTargeting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingService]
    });
  });

  it('should ...', inject([GeoTargetingService], (service: GeoTargetingService) => {
    expect(service)
      .toBeTruthy();
  }));
});
