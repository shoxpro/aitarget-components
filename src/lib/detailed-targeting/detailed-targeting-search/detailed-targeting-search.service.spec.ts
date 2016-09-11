/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetailedTargetingSearchService } from './detailed-targeting-search.service';

describe('Service: DetailedTargetingSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailedTargetingSearchService]
    });
  });

  it('should ...', inject([DetailedTargetingSearchService], (service: DetailedTargetingSearchService) => {
    expect(service).toBeTruthy();
  }));
});
