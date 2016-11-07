/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapControlsComponent } from './geo-targeting-map-controls.component';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate';

describe('Component: GeoTargetingMapControls', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingMapControlsComponent,
        TranslatePipe
      ],
      providers:    [
        {provide: Store, useValue: {let () {}}},
        {provide: TranslateService, useValue: {}},
        {provide: GeoTargetingMapService, useValue: {}}
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapControlsComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
