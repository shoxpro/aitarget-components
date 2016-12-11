/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingInputComponent } from './geo-targeting-input.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe, TranslateService } from 'ng2-translate';
import { FormsModule } from '@angular/forms';

describe('Component: GeoTargetingInput', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [FormsModule],
      declarations: [GeoTargetingInputComponent, TranslatePipe],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA],
      providers:    [
        {provide: TranslateService, useValue: {}},
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingInputComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
