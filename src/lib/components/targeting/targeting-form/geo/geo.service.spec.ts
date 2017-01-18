/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoService } from './geo.service';
import { Store } from '@ngrx/store';
import { GeoActions } from './geo.actions';
import { GeoInfoService } from './geo-info/geo-info.service';
import { TranslateService } from 'ng2-translate';

describe('Service: Geo', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      providers: [
        GeoService,
        {provide: GeoActions, useValue: {}},
        {provide: GeoInfoService, useValue: {}},
        {provide: TranslateService, useValue: {}},
        {provide: Store, useValue: {let () {}}},
      ]
    });
  });

  it('should ...', inject([GeoService], (service: GeoService) => {
    expect(service)
      .toBeTruthy();
  }));
});
