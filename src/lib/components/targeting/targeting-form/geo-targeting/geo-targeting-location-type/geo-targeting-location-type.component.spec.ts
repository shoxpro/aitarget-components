/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingLocationTypeComponent } from './geo-targeting-location-type.component';
import { GeoTargetingLocationTypeService } from './geo-targeting-location-type.service';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Component: GeoTargetingType', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoTargetingLocationTypeComponent],
      providers:    [
        {provide: Store, useValue: {let () {}}},
        {provide: GeoTargetingLocationTypeService, useValue: {}},
        {provide: TranslateService, useValue: {}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingLocationTypeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
