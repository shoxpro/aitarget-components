/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoModeComponent } from './geo-mode.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GeoModeService } from './geo-mode.service';
import { Store } from '@ngrx/store';

describe('Component: GeoMode', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoModeComponent
      ],
      providers:    [
        {provide: Store, useValue: {let () {}}},
        {provide: GeoModeService, useValue: {}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoModeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
