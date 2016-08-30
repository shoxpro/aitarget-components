/* tslint:disable:no-unused-variable */

import {
    beforeEach, beforeEachProviders,
    describe, xdescribe,
    expect, it, xit,
    async, inject
} from '@angular/core/testing';
import {DetailedTargetingSelectedService} from './detailed-targeting-selected.service';

describe('DetailedTargetingSelected Service', () => {
    beforeEachProviders(() => [DetailedTargetingSelectedService]);

    it('should ...',
        inject([DetailedTargetingSelectedService], (service: DetailedTargetingSelectedService) => {
            expect(service).toBeTruthy();
        }));
});
