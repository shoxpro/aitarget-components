/* tslint:disable:no-unused-variable */

import {describe, expect, it, inject} from '@angular/core/testing';
import {DetailedTargetingInputComponent} from './detailed-targeting-input.component';
import {DetailedTargetingApiService} from '../detailed-targeting-api/detailed-targeting-api.service';
import {DetailedTargetingModeService} from '../detailed-targeting-mode/detailed-targeting-mode.service';
import {DetailedTargetingInfoService} from '../detailed-targeting-info/detailed-targeting-info.service';
import {DetailedTargetingInputService} from './detailed-targeting-input.service';
import {ChangeDetectorRef} from '@angular/core';
import {DetailedTargetingSelectedService} from "../detailed-targeting-selected/detailed-targeting-selected.service";

describe('Component: DetailedTargetingInput', () => {
    it('should create an instance', () => {
        inject([DetailedTargetingApiService,
            DetailedTargetingModeService,
            DetailedTargetingInputService,
            DetailedTargetingInfoService, DetailedTargetingSelectedService, ChangeDetectorRef], (DetailedTargetingApiService, DetailedTargetingModeService,
                                                                                                 DetailedTargetingInputService, DetailedTargetingInfoService,
                                                                                                 DetailedTargetingSelectedService, ChangeDetectorRef) => {
            let component = new DetailedTargetingInputComponent(DetailedTargetingApiService, DetailedTargetingModeService,
                DetailedTargetingInputService, DetailedTargetingInfoService, DetailedTargetingSelectedService, ChangeDetectorRef);
            expect(component)
                .toBeTruthy();
        });
    });
});
