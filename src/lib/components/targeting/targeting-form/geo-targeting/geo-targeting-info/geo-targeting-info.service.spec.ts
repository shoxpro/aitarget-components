/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingInfoService } from './geo-targeting-info.service';
import { Store } from '@ngrx/store';
import { GeoTargetingInfoActions } from './geo-targeting-info.actions';
import { GeoTargetingIdService } from '../geo-targeting.id';
import { SharedActions } from '../../../../../shared/actions/index';

describe('Service: GeoTargetingInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoTargetingInfoService,
        {provide: Store, useValue: {}},
        {provide: GeoTargetingIdService, useValue: {id$: {getValue () {}}}},
        {provide: GeoTargetingInfoActions, useValue: {}},
        {provide: SharedActions, useValue: {}},
      ]
    });
  });

  it('should ...', inject([GeoTargetingInfoService], (service: GeoTargetingInfoService) => {
    expect(service)
      .toBeTruthy();
  }));
});
