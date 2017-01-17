import { Injectable } from '@angular/core';
import { FB } from '../../fb/fb.interface';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
import { FbService } from '../../fb/fb.service';
import { Observable } from 'rxjs';
import { TargetingSpec } from '../../targeting/targeting-spec.interface';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSpec } from '../../targeting/targeting-spec-geo.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/index';
import { GeoTargetingTypeService } from '../geo-targeting-type/geo-targeting-type.service';
import { SdkError } from '../../shared/errors/sdkError';
import { typeMap } from '../geo-targeting-selected/geo-targeting-selected.constants';

@Injectable()
export class GeoTargetingApiService {

  _defaultLang: string = 'en_US';
  lang: string         = this._defaultLang;

  get sdk (): Observable<FB> {
    return this.fbService.sdk
               .filter((FB: FB) => Boolean(FB))
               .take(1);
  }

  /**
   * Simplify geo locations for receiving adgeolocationmeta
   * @see https://developers.facebook.com/docs/marketing-api/targeting-search/v2.7#geo-meta
   * @param geoLocations
   * @param excludedGeoLocations
   * @returns {{}}
   */
  processGeoLocations (geoLocations: GeoTargetingSpec = {}, excludedGeoLocations: GeoTargetingSpec = {}) {
    let simplifiedGeoLocations = {};
    let map                    = {};

    let types = Object.values(typeMap);

    types.forEach((type: string) => {
      // Combine items from included and excluded locations
      let items = (geoLocations[type] || []).concat(excludedGeoLocations[type] || []);

      items.forEach((item) => {
        simplifiedGeoLocations[type] = simplifiedGeoLocations[type] || [];
        let key: string | number     = item.key;

        if (['countries', 'country_groups'].includes(type)) {
          key = (<string>item);
        }

        if (type === 'regions' || type === 'cities') {
          key = Number(item.key);
        }

        simplifiedGeoLocations[type].push(key);
        map[key] = item;
      });
    });

    return {simplified: simplifiedGeoLocations, map: map};
  }

  constructor (private fbService: FbService,
               private translateService: TranslateService,
               private geoTargetingTypeService: GeoTargetingTypeService,
               private _store: Store<AppState>) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  search (q: string) {
    return this._store.let(this.geoTargetingTypeService.getModel)
               .take(1)
               .map(({selected}) => selected.map(type => type.id))
               .filter((locationTypes) => Boolean(locationTypes.length))
               .switchMap((locationTypes) => {
                 return this.sdk.switchMap((FB: FB) => {
                   return Observable.create((observer) => {
                     FB.api(`/search`, {
                       q:              q,
                       location_types: locationTypes,
                       type:           'adgeolocation',
                       limit:          10,
                       place_fallback: true,
                       locale:         this.lang
                     }, (response) => {
                       if (response.error) {
                         observer.error(new SdkError(response.error));
                       } else {
                         observer.next(response.data);
                         observer.complete();
                       }
                     });
                   });
                 });
               });
  };

  /**
   * Get list of items for selected locations
   * @param spec
   * @returns {Observable<T>}
   */
  getSelectedLocationItems (spec: TargetingSpec) {
    let processedGeoLocations = this.processGeoLocations(spec.geo_locations, spec.excluded_geo_locations);

    // Get all excluded keys
    let excludedKeys = [];
    for (let type in spec.excluded_geo_locations) {
      if (spec.excluded_geo_locations.hasOwnProperty(type)) {
        spec.excluded_geo_locations[type].forEach((item: GeoTargetingItem) => {
          // Item should have a location key
          // But for countries item is country code itself, eg. RU, US, CA, etc.
          excludedKeys.push(item.key || item);
        });
      }
    }

    // Require metadata for locations and extract only items from the it
    return this.metaData(processedGeoLocations.simplified)
               .map((metaData: any) => {
                 let items: GeoTargetingItem[] = [];

                 /**
                  * Iterate through geo location metadata and get all available items
                  * @see https://developers.facebook.com/docs/marketing-api/targeting-search/v2.7#geo-meta
                  */
                 for (let type in metaData) {
                   if (metaData.hasOwnProperty(type)) {
                     for (let key in metaData[type]) {
                       if (metaData[type].hasOwnProperty(key)) {
                         let item         = metaData[type][key];
                         let selectedItem = processedGeoLocations.map[item.key];

                         item.excluded = excludedKeys.indexOf(key) > -1;

                         item.radius        = selectedItem.radius || 0;
                         item.distance_unit = selectedItem.distance_unit ||
                           (this.lang === 'en_US' ? 'mile' : 'kilometer');

                         items.push(item);
                       }
                     }
                   }
                 }

                 return items;
               });
  }

  /**
   * Require metaData for simplified locations
   * @see Geo locations metadata in https://developers.facebook.com/docs/marketing-api/targeting-search/v2.7
   * @param simplifiedLocations
   * @returns {Observable<T>}
   */
  metaData (simplifiedLocations) {
    if (!Object.keys(simplifiedLocations).length) {
      return Observable.of({});
    }

    const params = Object.assign({
      type:                          'adgeolocationmeta',
      show_polygons_and_coordinates: 1,
      locale:                        this.lang
    }, simplifiedLocations, {
      location_types: null
    });

    return this.sdk.switchMap((FB: FB) => Observable.create((observer) => {
      FB.api(`/search`, params, (response) => {
        if (response.error) {
          observer.error(new SdkError(response.error));
        } else {
          observer.next(response.data);
          observer.complete();
        }
      });
    }));
  };

  /**
   * Suggest radius for specific location
   * @see Geo locations metadata in https://developers.facebook.com/docs/marketing-api/targeting-search/v2.7
   * @returns {Observable<T>}
   * @param item
   */
  suggestRadius (item: GeoTargetingItem) {
    if (!item.latitude || !item.longitude) {
      Observable.of(null);
    }

    let params = {
      type:          'adradiussuggestion',
      latitude:      item.latitude,
      longitude:     item.longitude,
      distance_unit: item.distance_unit,
      locale:        this.lang
    };

    return this.sdk.switchMap((FB: FB) => Observable.create((observer) => {
      FB.api(`/search`, params, (response) => {
        if (response.error) {
          observer.error(new SdkError(response.error));
        } else {
          observer.next(response.data);
          observer.complete();
        }
      });
    }));
  };

}
