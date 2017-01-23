/* tslint:disable:no-unused-variable */
import { DemoGeoComponent } from './demo-geo.component';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Component: DemoGeo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [DemoGeoComponent],
      providers:    [],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(DemoGeoComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
