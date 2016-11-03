/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service.new';

describe('Service: GeoTargetingMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [],
      providers: [GeoTargetingMapService,
        {provide: TranslateService, useValue: {}},
        {provide: GeoTargetingInfoService, useValue: {}},
        {provide: GeoTargetingModeService, useValue: {}},
        {provide: ComponentsHelperService, useValue: {}},
        {provide: GeoTargetingSelectedService, useValue: {}}
      ]
    });
  });

  it('should ...', inject([GeoTargetingMapService], (service: GeoTargetingMapService) => {
    expect(service)
      .toBeTruthy();
  }));
});
