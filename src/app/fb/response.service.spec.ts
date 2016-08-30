/* tslint:disable:no-unused-variable */

import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { ResponseService } from './response.service';

describe('Response Service', () => {
  beforeEachProviders(() => [ResponseService]);

  it('should ...',
    inject([ResponseService], (service: ResponseService) => {
      expect(service).toBeTruthy();
    }));
});
