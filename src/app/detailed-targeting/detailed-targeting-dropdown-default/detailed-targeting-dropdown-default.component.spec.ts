/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement, ChangeDetectorRef } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DetailedTargetingDropdownDefaultComponent } from './detailed-targeting-dropdown-default.component';
import { DetailedTargetingDropdownDefaultService } from './detailed-targeting-dropdown-default.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.component';
import { TargetingSpecService } from '../../targeting/targeting-spec.service';

describe('Component: DetailedTargetingDropdownDefault', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingDropdownDefaultService,
      DetailedTargetingInfoService,
      TargetingSpecService,
      ChangeDetectorRef], (DetailedTargetingDropdownDefaultService,
                           DetailedTargetingInfoService,
                           TargetingSpecService,
                           ChangeDetectorRef) => {
      let component = new DetailedTargetingDropdownDefaultComponent(DetailedTargetingDropdownDefaultService,
        DetailedTargetingInfoService,
        TargetingSpecService,
        ChangeDetectorRef);
      expect(component)
        .toBeTruthy();
    });
  });
});
