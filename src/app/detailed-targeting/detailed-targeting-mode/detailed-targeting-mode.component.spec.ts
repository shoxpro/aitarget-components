/* tslint:disable:no-unused-variable */

import { ChangeDetectorRef } from '@angular/core';
import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingModeComponent } from './detailed-targeting-mode.component';
import { DetailedTargetingModeService } from './detailed-targeting-mode.service';

describe('Component: DetailedTargetingMode', () => {
  it('should create an instance', () => {
    inject([DetailedTargetingModeService, ChangeDetectorRef], (DetailedTargetingModeService, ChangeDetectorRef) => {
      let component = new DetailedTargetingModeComponent(DetailedTargetingModeService, ChangeDetectorRef);
      expect(component)
        .toBeTruthy();
    });
  });
});
