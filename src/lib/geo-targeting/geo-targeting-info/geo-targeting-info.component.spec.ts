/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingInfoComponent } from './geo-targeting-info.component';
import { LibModule } from '../../lib.module';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingInfoService } from './geo-targeting-info.service';
import { GeoTargetingLocationTypeService } from '../geo-targeting-location-type/geo-targeting-location-type.service';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';

describe('Component: GeoTargetingInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingSelectedService, GeoTargetingInfoService,
        GeoTargetingLocationTypeService, GeoTargetingApiService, GeoTargetingMapService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingInfoComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
