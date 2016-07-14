/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DetailedTargetingInputComponent } from './detailed-targeting-input.component';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';

describe('Component: DetailedTargetingInput', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingApiService], (DetailedTargetingApiService: DetailedTargetingApiService) => {
      let component = new DetailedTargetingInputComponent(DetailedTargetingApiService);
      expect(component).toBeTruthy();
    });
  });
});
