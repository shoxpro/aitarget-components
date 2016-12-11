/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingRadiusService } from './geo-targeting-radius.service';

describe('Service: GeoTargetingRadius', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingRadiusService]
    });
  });

  it('should ...', inject([GeoTargetingRadiusService], (service: GeoTargetingRadiusService) => {
    expect(service)
      .toBeTruthy();
  }));
});
