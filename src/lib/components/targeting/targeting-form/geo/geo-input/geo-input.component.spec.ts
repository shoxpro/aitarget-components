/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoInputComponent } from './geo-input.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/src/translate.pipe';
import { TranslateService } from 'ng2-translate/src/translate.service';
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
