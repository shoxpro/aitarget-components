/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingTypeComponent } from './geo-targeting-type.component';
import { LibModule } from '../../lib.module';
import { GeoTargetingTypeService } from './geo-targeting-type.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';

describe('Component: GeoTargetingType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingTypeService, GeoTargetingTypeService, GeoTargetingSelectedService, GeoTargetingInfoService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingTypeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
