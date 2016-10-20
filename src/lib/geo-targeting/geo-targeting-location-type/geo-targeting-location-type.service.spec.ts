/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingLocationTypeService } from './geo-targeting-location-type.service';

describe('Service: GeoTargetingType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingLocationTypeService]
    });
  });

  it('should ...', inject([GeoTargetingLocationTypeService], (service: GeoTargetingLocationTypeService) => {
    expect(service)
      .toBeTruthy();
  }));
});
