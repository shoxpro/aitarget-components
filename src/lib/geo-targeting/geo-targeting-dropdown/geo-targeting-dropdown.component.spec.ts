/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingDropdownComponent } from './geo-targeting-dropdown.component';
import { LibModule } from '../../lib.module';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';

describe('Component: GeoTargetingDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingDropdownService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingDropdownComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
