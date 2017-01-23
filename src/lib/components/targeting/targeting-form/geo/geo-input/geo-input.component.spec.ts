/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoInputComponent } from './geo-input.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe, TranslateService } from 'ng2-translate';
import { FormsModule } from '@angular/forms';

describe('Component: GeoInput', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [FormsModule],
      declarations: [GeoInputComponent, TranslatePipe],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA],
      providers:    [
        {provide: TranslateService, useValue: {}},
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoInputComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
