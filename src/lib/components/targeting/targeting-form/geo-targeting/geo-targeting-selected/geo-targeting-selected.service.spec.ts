/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { Store } from '@ngrx/store';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingLocationTypeService } from '../geo-targeting-location-type/geo-targeting-location-type.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingIdService } from '../geo-targeting.id';

describe('Service: GeoTargetingSelected', () => {

  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:   [],
      providers: [
        GeoTargetingSelectedService,
        {provide: Store, useValue: {let () {}}},
        {provide: GeoTargetingApiService, useValue: {}},
        {provide: GeoTargetingLocationTypeService, useValue: {}},
        {provide: GeoTargetingModeService, useValue: {}},
        {provide: GeoTargetingIdService, useValue: {id$: {getValue () {}}}},
        {provide: GeoTargetingSelectedActions, useValue: {}},
        {provide: GeoTargetingInfoService, useValue: {}},
        {provide: TranslateService, useValue: {}},
      ]
    });
  });

  beforeEach(inject([GeoTargetingSelectedService], (service: GeoTargetingSelectedService) => {
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
