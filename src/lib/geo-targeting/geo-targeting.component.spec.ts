/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingComponent } from './geo-targeting.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingApiService } from './geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingSelectedService } from './geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingLocationTypeService } from './geo-targeting-location-type/geo-targeting-location-type.service';
import { GeoTargetingModeService } from './geo-targeting-mode/geo-targeting-mode.service';
import { SharedActions } from '../shared/actions/index';

xdescribe('Component: GeoTargeting', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoTargetingComponent],
      providers:    [
        {
          provide: TranslateService, useValue: {setDefaultLang () {}}
        },
        {provide: Store, useValue: {let () {}}},
        {provide: SharedActions, useValue: {}},
        {provide: GeoTargetingApiService, useValue: {}},
        {provide: GeoTargetingSelectedService, useValue: {}},
        {provide: GeoTargetingLocationTypeService, useValue: {}},
        {provide: GeoTargetingModeService, useValue: {}}
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
