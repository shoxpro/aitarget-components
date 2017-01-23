/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoLocationTypeService } from './geo-location-type.service';
import { Store } from '@ngrx/store';
import { GeoLocationTypeActions } from './geo-location-type.actions';
import { GeoIdService } from '../geo.id';

describe('Service: GeoType', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      providers: [
        GeoLocationTypeService,
        {provide: Store, useValue: {let () { return; }}},
        {provide: GeoIdService, useValue: {id$: {getValue () { return; }}}},
        {provide: GeoLocationTypeActions, useValue: {}},
      ]
    });
  });

  it('should ...', inject([GeoLocationTypeService], (service: GeoLocationTypeService) => {
    expect(service)
      .toBeTruthy();
  }));
});
