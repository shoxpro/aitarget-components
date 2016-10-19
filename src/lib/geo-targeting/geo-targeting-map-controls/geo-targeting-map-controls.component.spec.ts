/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapControlsComponent } from './geo-targeting-map-controls.component';
import { LibModule } from '../../lib.module';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingTypeService } from '../geo-targeting-type/geo-targeting-type.service';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';

describe('Component: GeoTargetingMapControls', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingMapService, GeoTargetingMapService, GeoTargetingInfoService,
        GeoTargetingModeService, GeoTargetingSelectedService, GeoTargetingApiService,
        GeoTargetingTypeService, ComponentsHelperService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapControlsComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
