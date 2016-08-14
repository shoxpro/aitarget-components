/* tslint:disable:no-unused-variable */

import { describe, expect, it, inject } from '@angular/core/testing';
import { DetailedTargetingComponent } from './detailed-targeting.component';

describe('Component: DetailedTargeting', () => {
  it('should create an instance', () => {
    inject([], () => {
      this.component = new DetailedTargetingComponent();
      expect(this.component)
        .toBeTruthy();
    });
  });
});
