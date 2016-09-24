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
   * @param excludedGeoLocations
   * @returns {{}}
   */
  private processGeoLocations (geoLocations: GeoTargetingSpec, excludedGeoLocations: GeoTargetingSpec) {
    let simplifiedGeoLocations = {};

    let types = ['countries', 'regions', 'cities', 'zips', 'geo_markets', 'electoral_districts'];

    types.forEach((type: string) => {
      // Combine items from included and excluded locations
      let items: GeoTargetingItem[] = (geoLocations[type] || []).concat(excludedGeoLocations[type] || []);

      items.forEach((item: GeoTargetingItem) => {
        simplifiedGeoLocations[type] = simplifiedGeoLocations[type] || [];
        let key: string | number     = item.key;

        if (type === 'regions' || type === 'cities') {
          key = Number(item.key);
        }

        simplifiedGeoLocations[type].push(key);
      });
    });

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
    }, this.processGeoLocations(spec.geo_locations, spec.excluded_geo_locations), {
      location_types: null
    });

    // Get all excluded keys
    let excludedKeys = [];
    for (let type in spec.excluded_geo_locations) {
      if (spec.excluded_geo_locations.hasOwnProperty(type)) {
        spec.excluded_geo_locations[type].forEach((item: GeoTargetingItem) => {
          excludedKeys.push(item.key);
        });
      }
    }

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
                let item      = response.data[type][key];
                item.excluded = excludedKeys.indexOf(key) > -1;
                items.push(item);
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
