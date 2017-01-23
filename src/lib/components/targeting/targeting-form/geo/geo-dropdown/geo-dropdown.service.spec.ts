/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoDropdownService } from './geo-dropdown.service';

describe('Service: GeoDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoDropdownService]
    });
  });

  it('should ...', inject([GeoDropdownService], (service: GeoDropdownService) => {
    expect(service)
      .toBeTruthy();
  }));
});
