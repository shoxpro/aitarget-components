/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingModeService } from './geo-targeting-mode.service';
import { GeoTargetingModeActions } from './geo-targeting-mode.actions';
import { Store } from '@ngrx/store';

describe('Service: GeoTargetingMode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingModeService,
        {provide: Store, useValue: {}},
        {provide: GeoTargetingModeActions, useValue: {}}
      ]
    });
  });

  it('should ...', inject([GeoTargetingModeService], (service: GeoTargetingModeService) => {
    expect(service)
      .toBeTruthy();
  }));
});
