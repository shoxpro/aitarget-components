import { Injectable } from '@angular/core';
import { FB } from '../../fb/fb.interface';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
import { FbService } from '../../fb/fb.service';
import { Subject } from 'rxjs';
import { TargetingSpec } from '../../targeting/targeting-spec.interface';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSpec } from '../../targeting/targeting-spec-geo.interface';
import { LibState } from '../../lib-state.interface';
import { Store } from '@ngrx/store';
import { typeModel } from '../geo-targeting-type/geo-targeting-type.model';

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
  private processGeoLocations (geoLocations: GeoTargetingSpec = {}, excludedGeoLocations: GeoTargetingSpec = {}) {
    let simplifiedGeoLocations = {};
    let map                    = {};

    let types = ['countries', 'regions', 'cities', 'zips', 'geo_markets', 'electoral_districts', 'custom_locations'];

    types.forEach((type: string) => {
      // Combine items from included and excluded locations
      let items = (geoLocations[type] || []).concat(excludedGeoLocations[type] || []);

      items.forEach((item) => {
        simplifiedGeoLocations[type] = simplifiedGeoLocations[type] || [];
        let key: string | number     = item.key;

        if (type === 'countries') {
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

  constructor (private FbService: FbService,
               private TranslateService: TranslateService,
               private _store: Store<LibState>) {
    this.TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  public search (q: string) {
    let _response = new Subject();

    // Define locations types to search for
    let location_types;
    this._store.let(typeModel)
        .subscribe(({selected}) => {
          // Array of selected types' ids
          location_types = selected.map(type => type.id);
        });

    this.api.subscribe((FB: FB) => {
      FB.api(`/search`, {
        q:              q,
        location_types: location_types,
        type:           'adgeolocation',
        limit:          10,
        place_fallback: true,
        locale:         this.lang
      }, (response) => {
        _response.next(response.data);
      });
    });

    return _response.asObservable();
  };

  /**
   * Get list of items for selected locations
   * @param spec
   * @returns {Observable<T>}
   */
  public getSelectedLocationItems (spec: TargetingSpec) {
    let _items = new Subject();

    let processedGeoLocations = this.processGeoLocations(spec.geo_locations, spec.excluded_geo_locations);

    // Get all excluded keys
    let excludedKeys = [];
    for (let type in spec.excluded_geo_locations) {
      if (spec.excluded_geo_locations.hasOwnProperty(type)) {
        spec.excluded_geo_locations[type].forEach((item: GeoTargetingItem) => {
          excludedKeys.push(item.key);
        });
      }
    }

    // Require metadata for locations and extract only items from the it
    this.metaData(processedGeoLocations.simplified)
        .subscribe((metaData: any) => {
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
                  item.distance_unit = selectedItem.distance_unit || (this.lang === 'en_US' ? 'mile' : 'kilometer');

                  items.push(item);
                }
              }
            }
          }

          _items.next(items);
        });
    return _items.asObservable();
  }

  /**
   * Require metaData for simplified locations
   * @see Geo locations metadata in https://developers.facebook.com/docs/marketing-api/targeting-search/v2.7
   * @param simplifiedLocations
   * @returns {Observable<T>}
   */
  public metaData (simplifiedLocations) {
    let _response = new Subject();

    let params = Object.assign({
      type:                          'adgeolocationmeta',
      show_polygons_and_coordinates: 1,
      locale:                        this.lang
    }, simplifiedLocations, {
      location_types: null
    });

    this.api.subscribe((FB: FB) => {
      FB.api(`/search`, params, (response) => {
        _response.next(response.data);
      });
    });

    return _response.asObservable();
  };

  /**
   * Suggest radius for specific location
   * @see Geo locations metadata in https://developers.facebook.com/docs/marketing-api/targeting-search/v2.7
   * @returns {Observable<T>}
   * @param item
   */
  public suggestRadius (item: GeoTargetingItem) {
    let _response = new Subject();

    if (!item.latitude || !item.longitude) {
      _response.next(null);
    }

    let params = {
      type:          'adradiussuggestion',
      latitude:      item.latitude,
      longitude:     item.longitude,
      distance_unit: item.distance_unit,
      locale:        this.lang
    };

    this.api.subscribe((FB: FB) => {
      FB.api(`/search`, params, (response) => {
        _response.next(response.data);
      });
    });

    return _response.asObservable();
  };

}
