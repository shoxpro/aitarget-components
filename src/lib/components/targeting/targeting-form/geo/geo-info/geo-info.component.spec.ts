/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoInfoComponent } from './geo-info.component';
import { GeoInfoService } from './geo-info.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe } from 'ng2-translate';
import { Store } from '@ngrx/store';

describe('Component: GeoInfo', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoInfoComponent, TranslatePipe],
      providers:    [
        {provide: GeoInfoService, useValue: {}},
        {provide: Store, useValue: {let () { return; }}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoInfoComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
