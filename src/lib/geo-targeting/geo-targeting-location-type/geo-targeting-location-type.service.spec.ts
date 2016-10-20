/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeoTargetingTypeService } from './geo-targeting-location-type.service';

describe('Service: GeoTargetingType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingTypeService]
    });
  });

  it('should ...', inject([GeoTargetingTypeService], (service: GeoTargetingTypeService) => {
    expect(service).toBeTruthy();
  }));
});
