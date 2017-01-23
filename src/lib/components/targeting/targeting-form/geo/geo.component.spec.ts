/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoComponent } from './geo.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';
import { GeoApiService } from './geo-api/geo-api.service';
import { GeoSelectedService } from './geo-selected/geo-selected.service';
import { GeoLocationTypeService } from './geo-location-type/geo-location-type.service';
import { GeoModeService } from './geo-mode/geo-mode.service';
import { SharedActions } from '../../../../shared/actions/index';

xdescribe('Component: Geo', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoComponent],
      providers:    [
        {
          provide: TranslateService, useValue: {setDefaultLang () { return; }}
        },
        {provide: Store, useValue: {let () { return; }}},
        {provide: SharedActions, useValue: {}},
        {provide: GeoApiService, useValue: {}},
        {provide: GeoSelectedService, useValue: {}},
        {provide: GeoLocationTypeService, useValue: {}},
        {provide: GeoModeService, useValue: {}}
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
