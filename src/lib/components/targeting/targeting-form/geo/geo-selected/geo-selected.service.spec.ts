/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoSelectedService } from './geo-selected.service';
import { Store } from '@ngrx/store';
import { GeoApiService } from '../geo-api/geo-api.service';
import { GeoSelectedActions } from './geo-selected.actions';
import { GeoInfoService } from '../geo-info/geo-info.service';
import { TranslateService } from 'ng2-translate';
import { GeoLocationTypeService } from '../geo-location-type/geo-location-type.service';
import { GeoModeService } from '../geo-mode/geo-mode.service';
import { GeoIdService } from '../geo.id';

describe('Service: GeoSelected', () => {

  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:   [],
      providers: [
        GeoSelectedService,
        {provide: Store, useValue: {let () { return; }}},
        {provide: GeoApiService, useValue: {}},
        {provide: GeoLocationTypeService, useValue: {}},
        {provide: GeoModeService, useValue: {}},
        {provide: GeoIdService, useValue: {id$: {getValue () { return; }}}},
        {provide: GeoSelectedActions, useValue: {}},
        {provide: GeoInfoService, useValue: {}},
        {provide: TranslateService, useValue: {}},
      ]
    });
  });

  beforeEach(inject([GeoSelectedService], (service: GeoSelectedService) => {
    this.service = service;
  }));

  it('should ...', () => {
    expect(this.service)
      .toBeTruthy();
  });

  it('should have `updateItems` api method', () => {
    expect(this.service.updateItems)
      .toEqual(jasmine.any(Function));
  });

  it('should have `addItems` api method', () => {
    expect(this.service.addItems)
      .toEqual(jasmine.any(Function));
  });

  it('should have `removeItems` api method', () => {
    expect(this.service.removeItems)
      .toEqual(jasmine.any(Function));
  });

  it('should have `getSpec` api method', () => {
    expect(this.service.getSpec)
      .toEqual(jasmine.any(Function));
  });
});
