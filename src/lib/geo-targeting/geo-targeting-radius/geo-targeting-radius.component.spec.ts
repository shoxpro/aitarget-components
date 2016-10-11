/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingRadiusComponent } from './geo-targeting-radius.component';
import { LibModule } from '../../lib.module';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingTypeService } from '../geo-targeting-type/geo-targeting-type.service';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';

describe('Component: GeoTargetingRadius', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingSelectedService, GeoTargetingInfoService, GeoTargetingTypeService,
        GeoTargetingApiService, GeoTargetingMapService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingRadiusComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
