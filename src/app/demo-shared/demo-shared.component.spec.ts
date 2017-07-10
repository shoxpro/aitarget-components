/* tslint:disable:no-unused-variable */
import { DemoSharedComponent } from './demo-shared.component';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Component: DemoShared', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [DemoSharedComponent],
      providers:    [],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });
  xit('should create an instance', () => {
    let fixture = TestBed.createComponent(DemoSharedComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
