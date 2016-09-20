import { Injectable } from '@angular/core';
import { FB } from '../../fb/fb.interface';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
import { FbService } from '../../fb/fb.service';
import { Subject } from 'rxjs';

@Injectable()
export class GeoTargetingApiService {

  private _defaultLang: string = 'en_US';
  private lang: string         = this._defaultLang;

  private api = this.FbService.api
                    .filter((FB: FB) => Boolean(FB));

  constructor (private FbService: FbService,
               private TranslateService: TranslateService) {
    this.TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  public search (q: string) {
    let _response = new Subject();

    this.api.subscribe((FB: FB) => {
      FB.api(`/search`, {
        q:              q,
        location_types: ['country', 'region', 'geo_market', 'city', 'electoral_district', 'political_district', 'zip',
          'custom_location', 'place'],
        type:           'adgeolocation',
        limit:          10,
        locale:         this.lang
      }, (response) => {
        _response.next(response.data);
      });
    });

    return _response.asObservable();
  };

}
