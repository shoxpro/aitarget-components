/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoRadiusService } from './geo-radius.service';

describe('Service: GeoRadius', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoRadiusService]
    });
  });

  it('should ...', inject([GeoRadiusService], (service: GeoRadiusService) => {
    expect(service)
      .toBeTruthy();
  }));
});
