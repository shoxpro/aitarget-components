/* tslint:disable:no-unused-variable */
import { DemoDetailedTargetingComponent } from './demo-detailed-targeting.component';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Component: DemoDetailedTargeting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [DemoDetailedTargetingComponent],
      providers:    [],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(DemoDetailedTargetingComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
