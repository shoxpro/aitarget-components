/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoMapControlsComponent } from './geo-map-controls.component';
import { GeoMapService } from '../geo-map/geo-map.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate';
import { GeoModeService } from '../geo-mode/geo-mode.service';

describe('Component: GeoMapControls', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoMapControlsComponent,
        TranslatePipe
      ],
      providers:    [
        {provide: Store, useValue: {let () { return; }}},
        {provide: TranslateService, useValue: {}},
        {provide: GeoModeService, useValue: {}},
        {provide: GeoMapService, useValue: {}}
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoMapControlsComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
