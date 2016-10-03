/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeoTargetingMapService } from './geo-targeting-map.service';

describe('Service: GeoTargetingMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingMapService]
    });
  });

  it('should ...', inject([GeoTargetingMapService], (service: GeoTargetingMapService) => {
    expect(service).toBeTruthy();
  }));
});
