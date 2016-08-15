/* tslint:disable:no-unused-variable */

import { addProviders, inject } from '@angular/core/testing';
import { TargetingSpecService } from './targeting-spec.service';

describe('Service: TargetingSpec', () => {
  beforeEach(() => {
    addProviders([TargetingSpecService]);
  });

  it('should ...',
    inject([TargetingSpecService],
      (service: TargetingSpecService) => {
        expect(service)
          .toBeTruthy();
      }));
});
