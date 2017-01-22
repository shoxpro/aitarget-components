/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoLocationTypeComponent } from './geo-location-type.component';
import { GeoLocationTypeService } from './geo-location-type.service';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Component: GeoType', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoLocationTypeComponent],
      providers:    [
        {provide: Store, useValue: {let () { return; }}},
        {provide: GeoLocationTypeService, useValue: {}},
        {provide: TranslateService, useValue: {}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoLocationTypeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
