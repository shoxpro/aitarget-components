/* tslint:disable:no-unused-variable */

import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { FbService } from './fb.service';

describe('Fb Service', () => {
  beforeEachProviders(() => [FbService]);

  it('should ...',
    inject([FbService], (service: FbService) => {
      expect(service).toBeTruthy();
    }));
});
