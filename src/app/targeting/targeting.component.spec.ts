/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { TargetingComponent } from './targeting.component';

describe('Component: Targeting', () => {
  it('should create an instance', () => {
    let component = new TargetingComponent();
    expect(component).toBeTruthy();
  });
});
