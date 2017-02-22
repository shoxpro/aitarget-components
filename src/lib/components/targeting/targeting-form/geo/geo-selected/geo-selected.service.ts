import { Injectable } from '@angular/core';
import { GeoItem } from '../geo-item.interface';
import { Observable } from 'rxjs/Observable';
import { GeoSelectedState, GEO_TARGETING_SELECTED_KEY } from './geo-selected.reducer';
import { GeoRadiusService } from '../geo-radius/geo-radius.service';
import { typeMap } from './geo-selected.constants';
import { Store } from '@ngrx/store';
import { GeoApiService } from '../geo-api/geo-api.service';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { GeoSelectedActions } from './geo-selected.actions';
import { GeoInfoService } from '../geo-info/geo-info.service';
import { GeoModeService } from '../geo-mode/geo-mode.service';
import { GEO_TARGETING_STATE_KEY, GeoState } from '../geo.reducer';
import { GeoLocationTypeService } from '../geo-location-type/geo-location-type.service';
import { GeoIdService } from '../geo.id';
import { AppState } from '../../../../../../app/reducers/index';
import { TargetingSpec } from '../../../interfaces/targeting-spec.interface';
import { SdkError } from '../../../../../shared/errors/sdkError';
import { CustomLocation, City, Key } from '../../../interfaces/targeting-spec-geo.interface';

@Injectable()
export class GeoSelectedService {

  model$;

  getModel = (_store): Observable<GeoSelectedState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geo) => {
                   let id = this.geoIdService.id$.getValue();
                   return geo[id];
                 })
                 .filter((geoState: GeoState) => Boolean(geoState))
                 .map((geoState: GeoState) => {
                   return geoState[GEO_TARGETING_SELECTED_KEY];
                 })
                 .distinctUntilChanged();
  };

  /**
   * Show info message that some locations were replaced
   */
  informAboutReplaced (items: GeoItem[]) {
    this.model$
        .take(1)
        .map(({itemsReplaced}) => itemsReplaced)
        .filter((itemsReplaced) => Boolean(itemsReplaced.length))
        .map((itemsReplaced) => itemsReplaced
          .map((replacedItem) => replacedItem.name)
          .join(', ')
        )
        .subscribe((fromNames) => {
          let message = this.translateService.instant(`fba-geo-info.MESSAGE`, {
            fromNames: fromNames,
            toName:    items.map((item) => item.name)
                            .join(', ')
          });

          this.geoInfoService.showInfo({
            message,
            canRevert:  true,
            revertKeys: [GEO_TARGETING_SELECTED_KEY]
          });
        });
  }

  /**
   * Set suggested radius for passed location
   * @param item
   */
  setSuggestedRadius = (item: GeoItem): Observable<GeoItem> => {
    return Observable.create((observer) => {
      switch (item.type) {
        case 'city':
          item = GeoRadiusService.setDefaultRadius(item, this.translateService.currentLang);
          observer.next(item);
          break;
        case 'custom_location':
        case 'place':
          this.geoApiService.suggestRadius(item)
              .subscribe((suggestedRadius: null | Array<{suggested_radius: number,
                distance_unit: 'mile' | 'kilometer'}>) => {

                item.radius        = suggestedRadius[0].suggested_radius;
                item.distance_unit = suggestedRadius[0].distance_unit;

                observer.next(item);
              });
          break;
        default:
          observer.next(item);
          break;
      }
    })
                     .take(1);
  };

  /**
   * Set latitude, longitude or optional polygons for passed item
   * @returns {GeoItem}
   * @param items
   */
  setCoordinates = (items: GeoItem[]): Observable<GeoItem[]> => {
    let simplifiedGeoLocations = {};

    items.forEach((item) => {
      let mappedType           = typeMap[item.type];
      let key: string | number = item.key;

      simplifiedGeoLocations[mappedType] = simplifiedGeoLocations[mappedType] || [];

      if (item.type === 'regions' || item.type === 'cities') {
        key = Number(item.key);
      }

      simplifiedGeoLocations[mappedType].push(key);
    });

    return this.geoApiService.metaData(simplifiedGeoLocations)
               .map((metaData) => {
                 let extendedItems: GeoItem[] = [];

                 for (let mappedType in metaData) {
                   if (metaData.hasOwnProperty(mappedType)) {
                     extendedItems = extendedItems.concat(extendedItems, Object.values(metaData[mappedType]));
                   }
                 }

                 return extendedItems;
               });
  };

  extendItems (items: GeoItem[]) {
    return this.setCoordinates(items)
               .mergeMap((extendedItems) => {
                   return Observable.forkJoin(
                     extendedItems.map((extendedItem) => this.setSuggestedRadius(extendedItem))
                   );
                 }
               )
               .switchMap((extendedItems) => {
                 return this._store.let(this.geoModeService.getModel)
                            .take(1)
                            .map(({selectedMode}) => selectedMode.id === 'exclude')
                            .map((excluded) => extendedItems.map((item) => Object.assign(item, {excluded})));
               });
  }

  addItems (items: GeoItem[]) {
    this.extendItems(items)
        .do((extendedItems) => {
          this._store.dispatch(this.geoSelectedActions.addItems(extendedItems));
        })
        .switchMap(() => this.model$.take(1))
        .subscribe({
          next:  () => {
            this.informAboutReplaced(items);
          },
          error: (error) => {
            if (error instanceof SdkError) {
              this.geoInfoService.showInfo({level: 'error', message: error.message});
            }
          }
        });
  }

  setItems (items: GeoItem[]) {
    this._store.dispatch(this.geoSelectedActions.setItems(items));
  }

  updateItems (items: GeoItem[]) {
    this._store.dispatch(this.geoSelectedActions.updateItems(items));
  }

  removeItems (items: GeoItem[]) {
    this._store.dispatch(this.geoSelectedActions.removeItems(items));
  }

  /**
   * Return final targeting spec with included and excluded locations
   * @returns {TargetingSpec}
   */

  getSpec () {
    const initialSpec$: Observable<TargetingSpec> =
            this._store.let(this.geoLocationTypeService.getModel)
                .take(1)
                .map(({selectedType}) => selectedType)
                .filter((selectedType) => Boolean(selectedType))
                .map((selectedType) => {
                  return {
                    geo_locations:             {
                      location_types: selectedType.value
                    }, excluded_geo_locations: {}
                  };
                });

    let selectedItems = [];

    this.model$
        .take(1)
        .map(({items}) => items)
        .subscribe((items) => {
          selectedItems = items;
        });

    if (!selectedItems.length) {
      return initialSpec$;
    }

    const items$ = this.model$
                       .take(1)
                       .switchMap(({items}) => Observable.from(items));

    return initialSpec$
      .switchMap((initialSpec: TargetingSpec) => {
        return Observable.forkJoin(
          items$.scan((spec: TargetingSpec, item) => {
            let locations;
            // Switch location types depending on item mode
            if (item.excluded) {
              locations = spec.excluded_geo_locations;
            } else {
              locations = spec.geo_locations;
            }

            locations[typeMap[item.type]] = locations[typeMap[item.type]] || [];

            if (['country', 'country_group'].includes(item.type)) {
              locations[typeMap[item.type]].push(item.key);
            } else {
              let selectedValue: Key = {key: item.key, name: item.name};

              if (item.type === 'city') {
                (<City>selectedValue).radius        = item.radius;
                (<City>selectedValue).distance_unit = item.distance_unit;
              }

              if (['custom_location', 'place'].includes(item.type)) {
                (<CustomLocation>selectedValue).radius        = item.radius;
                (<CustomLocation>selectedValue).distance_unit = item.distance_unit;
                (<CustomLocation>selectedValue).latitude      = item.latitude;
                (<CustomLocation>selectedValue).longitude     = item.longitude;
                (<CustomLocation>selectedValue).name          = item.name;
                if (item.address_string !== item.name) {
                  (<CustomLocation>selectedValue).address_string = item.address_string;
                }
              }

              locations[typeMap[item.type]].push(selectedValue);
            }

            return spec;
          }, initialSpec)
        )
                         .map(([spec]) => spec);
      });
  }

  constructor (private _store: Store<AppState>,
               private geoApiService: GeoApiService,
               private geoLocationTypeService: GeoLocationTypeService,
               private geoSelectedActions: GeoSelectedActions,
               private geoModeService: GeoModeService,
               private geoInfoService: GeoInfoService,
               private geoIdService: GeoIdService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(this.getModel);
  }
}
