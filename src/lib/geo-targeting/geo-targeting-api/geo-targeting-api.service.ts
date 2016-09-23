import { Injectable } from '@angular/core';
import { FB } from '../../fb/fb.interface';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
import { FbService } from '../../fb/fb.service';
import { Subject } from 'rxjs';
import { TargetingSpec } from '../../targeting/targeting-spec.interface';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSpec } from '../../targeting/targeting-spec-geo.interface';

@Injectable()
export class GeoTargetingApiService {

  private _defaultLang: string = 'en_US';
  private lang: string         = this._defaultLang;

  private api = this.FbService.api
                    .filter((FB: FB) => Boolean(FB));

  /**
   * Simplify geo locations for receiving adgeolocationmeta
   * @see https://developers.facebook.com/docs/marketing-api/targeting-search/v2.7#geo-meta
   * @param geoLocations
   * @returns {{}}
   */
  private processGeoLocations (geoLocations: GeoTargetingSpec) {
    let simplifiedGeoLocations = {};

    for (let type in geoLocations) {
      if (geoLocations.hasOwnProperty(type)) {
        geoLocations[type].forEach((item: GeoTargetingItem) => {
          simplifiedGeoLocations[type] = simplifiedGeoLocations[type] || [];
          let key: string | number     = item.key;

          if (type === 'regions' || type === 'cities') {
            key = Number(item.key);
          }

          simplifiedGeoLocations[type].push(key);
        });
      }
    }

    return simplifiedGeoLocations;
  }

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

  public metaData (spec: TargetingSpec) {
    let _response = new Subject();

    let params = Object.assign({
      type:   'adgeolocationmeta',
      locale: this.lang
    }, this.processGeoLocations(spec.geo_locations), {
      location_types: null
    });

    this.api.subscribe((FB: FB) => {
      FB.api(`/search`, params, (response) => {
        let items: GeoTargetingItem[] = [];

        /**
         * Iterate through geo location metadata and get all available items
         * @see https://developers.facebook.com/docs/marketing-api/targeting-search/v2.7#geo-meta
         */
        for (let type in response.data) {
          if (response.data.hasOwnProperty(type)) {
            for (let key in response.data[type]) {
              if (response.data[type].hasOwnProperty(key)) {
                items.push(response.data[type][key]);
              }
            }
          }
        }

        _response.next(items);
      });
    });

    return _response.asObservable();
  };

}
