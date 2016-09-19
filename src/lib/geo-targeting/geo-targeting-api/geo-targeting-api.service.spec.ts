/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingApiService } from './geo-targeting-api.service';

describe('Service: Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingApiService]
    });
  });

  it('should ...', inject([GeoTargetingApiService], (service: GeoTargetingApiService) => {
    expect(service)
      .toBeTruthy();
  }));
});
