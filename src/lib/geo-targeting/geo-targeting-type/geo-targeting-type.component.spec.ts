/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingTypeComponent } from './geo-targeting-type.component';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingTypeService } from './geo-targeting-type.service';

describe('Component: GeoTargetingType', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      providers:    [
        {provide: Store, useValue: {let: () => new Subject()}},
        {provide: GeoTargetingTypeService, useValue: {}},
        {provide: TranslateService, useValue: {}}
      ],
      declarations: [GeoTargetingTypeComponent],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingTypeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
