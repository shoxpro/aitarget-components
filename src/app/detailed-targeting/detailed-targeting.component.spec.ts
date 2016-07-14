/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement, ChangeDetectorRef } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DetailedTargetingComponent } from './detailed-targeting.component';

describe('Component: DetailedTargeting', () => {
  it('should create an instance', () => {
    let component = new DetailedTargetingComponent();
    expect(component)
      .toBeTruthy();
  });
});
