/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingInfoComponent } from './geo-targeting-info.component';
import { GeoTargetingInfoService } from './geo-targeting-info.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe } from 'ng2-translate';
import { Store } from '@ngrx/store';

describe('Component: GeoTargetingInfo', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoTargetingInfoComponent, TranslatePipe],
      providers:    [
        {provide: GeoTargetingInfoService, useValue: {}},
        {provide: Store, useValue: {let () {}}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingInfoComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
