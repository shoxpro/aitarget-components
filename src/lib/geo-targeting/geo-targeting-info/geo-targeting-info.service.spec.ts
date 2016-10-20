/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingInfoService } from './geo-targeting-info.service';

describe('Service: GeoTargetingInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingInfoService]
    });
  });

  it('should ...', inject([GeoTargetingInfoService], (service: GeoTargetingInfoService) => {
    expect(service)
      .toBeTruthy();
  }));
});
