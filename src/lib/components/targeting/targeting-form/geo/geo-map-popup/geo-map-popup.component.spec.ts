/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoMapPopupComponent } from './geo-map-popup.component';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FullNamePipe } from '../full-name.pipe';
import { GeoModeService } from '../geo-mode/geo-mode.service';

describe('Component: GeoMapPopup', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoMapPopupComponent,
        FullNamePipe
      ],
      providers:    [
        {provide: Store, useValue: {let () {}}},
        {provide: GeoModeService, useValue: {let () {}}},
        {provide: GeoSelectedService, useValue: {}}
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoMapPopupComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
