/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoInfoService } from './geo-info.service';
import { Store } from '@ngrx/store';
import { GeoInfoActions } from './geo-info.actions';
import { GeoIdService } from '../geo.id';
import { SharedActions } from '../../../../../shared/actions/index';

describe('Service: GeoInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoInfoService,
        {provide: Store, useValue: {}},
        {provide: GeoIdService, useValue: {id$: {getValue () { return; }}}},
        {provide: GeoInfoActions, useValue: {}},
        {provide: SharedActions, useValue: {}},
      ]
    });
  });

  it('should ...', inject([GeoInfoService], (service: GeoInfoService) => {
    expect(service)
      .toBeTruthy();
  }));
});
