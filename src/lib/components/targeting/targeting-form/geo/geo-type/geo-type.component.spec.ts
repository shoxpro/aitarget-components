/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoTypeComponent } from './geo-type.component';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { GeoTypeService } from './geo-type.service';

describe('Component: GeoType', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      providers:    [
        {provide: Store, useValue: {let: () => new Subject()}},
        {provide: GeoTypeService, useValue: {}},
        {provide: TranslateService, useValue: {}}
      ],
      declarations: [GeoTypeComponent],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTypeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
