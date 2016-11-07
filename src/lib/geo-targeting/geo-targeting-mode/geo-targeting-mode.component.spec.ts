/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingModeComponent } from './geo-targeting-mode.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GeoTargetingModeService } from './geo-targeting-mode.service';
import { Store } from '@ngrx/store';

describe('Component: GeoTargetingMode', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingModeComponent
      ],
      providers:    [
        {provide: Store, useValue: {let () {}}},
        {provide: GeoTargetingModeService, useValue: {}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingModeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
