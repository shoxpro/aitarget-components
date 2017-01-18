/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingApiService } from './geo-targeting-api.service';
import { TranslateService } from 'ng2-translate';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { GeoTargetingTypeService } from '../geo-targeting-type/geo-targeting-type.service';
import { SdkService } from '../../../../../shared/sdk/sdk.service';

describe('Service: Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [],
      providers: [
        GeoTargetingApiService,
        {
          provide: SdkService, useValue: {
          api: new Subject()
        }
        },
        {
          provide: TranslateService, useValue: {
          onLangChange: new Subject()
        }
        },
        {provide: GeoTargetingTypeService, useValue: {}},
        {provide: Store, useValue: {}},
      ]
    });
  });

  it('should ...', inject([GeoTargetingApiService], (service: GeoTargetingApiService) => {
    expect(service)
      .toBeTruthy();
  }));
});
