/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { describe, expect, inject } from '@angular/core/testing';
import { BrowseMultiSelectComponent } from './browse-multi-select.component';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';

describe('Component: BrowseMultiSelect', () => {
  inject([ElementRef, DetailedTargetingSelectedService], (ElementRef, DetailedTargetingSelectedService) => {
    let component = new BrowseMultiSelectComponent(ElementRef, DetailedTargetingSelectedService);
    expect(component)
      .toBeTruthy();
  });
});
