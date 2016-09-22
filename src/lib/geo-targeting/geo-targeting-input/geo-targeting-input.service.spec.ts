/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingInputService } from './geo-targeting-input.service';

describe('Service: GeoTargetingInput', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingInputService]
    });
  });

  it('should ...', inject([GeoTargetingInputService], (service: GeoTargetingInputService) => {
    expect(service)
      .toBeTruthy();
  }));
});
