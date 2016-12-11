/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapPopupComponent } from './geo-targeting-map-popup.component';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FullNamePipe } from '../full-name.pipe';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';

describe('Component: GeoTargetingMapPopup', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingMapPopupComponent,
        FullNamePipe
      ],
      providers:    [
        {provide: Store, useValue: {let () {}}},
        {provide: GeoTargetingModeService, useValue: {let () {}}},
        {provide: GeoTargetingSelectedService, useValue: {}}
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapPopupComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
