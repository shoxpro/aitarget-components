/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingLocationTypeService } from './geo-targeting-location-type.service';
import { Store } from '@ngrx/store';
import { GeoTargetingLocationTypeActions } from './geo-targeting-location-type.actions';
import { GeoTargetingIdService } from '../geo-targeting.id';

describe('Service: GeoTargetingType', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      providers: [
        GeoTargetingLocationTypeService,
        {provide: Store, useValue: {let () {}}},
        {provide: GeoTargetingIdService, useValue: {id$: {getValue () {}}}},
        {provide: GeoTargetingLocationTypeActions, useValue: {}},
      ]
    });
  });

  it('should ...', inject([GeoTargetingLocationTypeService], (service: GeoTargetingLocationTypeService) => {
    expect(service)
      .toBeTruthy();
  }));
});
