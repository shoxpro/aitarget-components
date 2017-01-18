/* tslint:disable:no-unused-variable */
import { DemoGeoTargetingComponent } from './demo-geo-targeting.component';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Component: DemoGeoTargeting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [DemoGeoTargetingComponent],
      providers:    [],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(DemoGeoTargetingComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
