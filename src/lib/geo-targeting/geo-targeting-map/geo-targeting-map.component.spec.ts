/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { LibModule } from '../../lib.module';
import { GeoTargetingMapComponent } from './geo-targeting-map.component';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingTypeService } from '../geo-targeting-location-type/geo-targeting-location-type.service';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';

describe('Component: GeoTargetingMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingSelectedService, GeoTargetingApiService, GeoTargetingInfoService,
        GeoTargetingTypeService, GeoTargetingMapService, GeoTargetingModeService,
        ComponentsHelperService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
