/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DetailedTargetingSelectedComponent } from './detailed-targeting-selected.component';
import { TargetingSpecService } from '../../targeting/targeting-spec.service';

describe('Component: DetailedTargetingSelected', () => {
  it('should create an instance', () => {
    inject([TargetingSpecService], (TargetingSpecService) => {
      this.component = new DetailedTargetingSelectedComponent(TargetingSpecService);
      expect(this.component)
        .toBeTruthy();
    });
  });
});
