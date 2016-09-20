/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingApiService } from './geo-targeting-api.service';
import { LibModule } from '../../lib.module';
import { FbService } from '../../fb/fb.service';

describe('Service: Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingApiService, FbService]
    });
  });

  it('should ...', inject([GeoTargetingApiService], (service: GeoTargetingApiService) => {
    expect(service)
      .toBeTruthy();
  }));
});
