/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingDropdownComponent } from './geo-targeting-dropdown.component';
import { LibModule } from '../../lib.module';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingTypeService } from '../geo-targeting-type/geo-targeting-type.service';

describe('Component: GeoTargetingDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingDropdownService, GeoTargetingSelectedService,
        GeoTargetingModeService, GeoTargetingInfoService, GeoTargetingTypeService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingDropdownComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
