/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoMapService } from './geo-map.service';
import { ComponentsHelperService } from '../../../../../shared/services/components-helper.service';
import { GeoInfoService } from '../geo-info/geo-info.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { Store } from '@ngrx/store';
import { GeoApiService } from '../geo-api/geo-api.service';
import { GeoModeService } from '../geo-mode/geo-mode.service';

describe('Service: GeoMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [],
      providers: [GeoMapService,
        {provide: Store, useValue: {}},
        {provide: TranslateService, useValue: {}},
        {provide: GeoInfoService, useValue: {}},
        {provide: GeoModeService, useValue: {}},
        {provide: GeoApiService, useValue: {}},
        {provide: ComponentsHelperService, useValue: {}},
        {provide: GeoSelectedService, useValue: {}}
      ]
    });
  });

  it('should ...', inject([GeoMapService], (service: GeoMapService) => {
    expect(service)
      .toBeTruthy();
  }));
});
