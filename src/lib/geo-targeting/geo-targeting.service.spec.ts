/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingService } from './geo-targeting.service';
import { Store } from '@ngrx/store';
import { GeoTargetingActions } from './geo-targeting.actions';

describe('Service: GeoTargeting', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      providers: [
        GeoTargetingService,
        {provide: GeoTargetingActions, useValue: {}},
        {provide: Store, useValue: {let () {}}},
      ]
    });
  });

  it('should ...', inject([GeoTargetingService], (service: GeoTargetingService) => {
    expect(service)
      .toBeTruthy();
  }));
});
