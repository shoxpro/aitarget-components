/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { GeoTargetingSelectedComponent } from './geo-targeting-selected.component';
import { LibModule } from '../../lib.module';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingTypeService } from '../geo-targeting-location-type/geo-targeting-location-type.service';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';

describe('Component: GeoTargetingSelected', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingSelectedService, GeoTargetingInfoService, GeoTargetingTypeService,
        GeoTargetingApiService, GeoTargetingMapService, GeoTargetingModeService,
        {provide: ComponentsHelperService, useValue: {}}]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingSelectedComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
