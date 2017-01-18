/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoModeService } from './geo-mode.service';
import { GeoModeActions } from './geo-mode.actions';
import { Store } from '@ngrx/store';
import { GeoIdService } from '../geo.id';

describe('Service: GeoMode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoModeService,
        {provide: Store, useValue: {}},
        {provide: GeoIdService, useValue: {id$: {getValue () {}}}},
        {provide: GeoModeActions, useValue: {}}
      ]
    });
  });

  it('should ...', inject([GeoModeService], (service: GeoModeService) => {
    expect(service)
      .toBeTruthy();
  }));
});
