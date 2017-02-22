/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GeoApiService } from './geo-api.service';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { GeoTypeService } from '../geo-type/geo-type.service';
import { SdkService } from '../../../../../shared/sdk/sdk.service';

describe('Service: Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [],
      providers: [
        GeoApiService,
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
        {provide: GeoTypeService, useValue: {}},
        {provide: Store, useValue: {}},
      ]
    });
  });

  it('should ...', inject([GeoApiService], (service: GeoApiService) => {
    expect(service)
      .toBeTruthy();
  }));
});
