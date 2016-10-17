/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { LibModule } from '../../lib.module';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingTypeService } from '../geo-targeting-location-type/geo-targeting-location-type.service';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';

describe('Service: GeoTargetingMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingMapService, GeoTargetingInfoService, GeoTargetingModeService,
        GeoTargetingSelectedService, GeoTargetingApiService, GeoTargetingTypeService,
        {provide: ComponentsHelperService, useValue: {}}]
    });
  });

  it('should ...', inject([GeoTargetingMapService], (service: GeoTargetingMapService) => {
    expect(service)
      .toBeTruthy();
  }));
});
