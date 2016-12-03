import { Injectable } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { Observable } from 'rxjs';
import { GeoTargetingSelectedState, GEO_TARGETING_SELECTED_KEY } from './geo-targeting-selected.reducer';
import { GeoTargetingRadiusService } from '../geo-targeting-radius/geo-targeting-radius.service';
import { typeMap } from './geo-targeting-selected.constants';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.reducer';
import { TargetingSpec } from '../../targeting/interfaces/targeting-spec.interface';
import { GeoTargetingLocationTypeService } from '../geo-targeting-location-type/geo-targeting-location-type.service';
import { Key, City, CustomLocation } from '../../targeting/interfaces/targeting-spec-geo.interface';
import { GeoTargetingIdService } from '../geo-targeting.id';
import { SdkError } from '../../shared/errors/sdkError';

@Injectable()
export class GeoTargetingSelectedService {

  model$;

  getModel = (_store): Observable<GeoTargetingSelectedState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargeting) => {
                   let id = this.geoTargetingIdService.id$.getValue();
                   return geoTargeting[id];
                 })
                 .filter((geoTargetingState: GeoTargetingState) => Boolean(geoTargetingState))
                 .map((geoTargetingState: GeoTargetingState) => {
                   return geoTargetingState[GEO_TARGETING_SELECTED_KEY];
                 })
                 .distinctUntilChanged();
  };

  /**
   * Show info message that some locations were replaced
   */
  informAboutReplaced (items: GeoTargetingItem[]) {
    this.model$
        .take(1)
        .map(({itemsReplaced}) => itemsReplaced)
        .filter((itemsReplaced) => Boolean(itemsReplaced.length))
        .map((itemsReplaced) => itemsReplaced
          .map((replacedItem) => replacedItem.name)
          .join(', ')
        )
        .subscribe((fromNames) => {
          let message = this.translateService.instant(`geo-targeting-info.MESSAGE`, {
            fromNames: fromNames,
            toName:    items.map((item) => item.name)
                            .join(', ')
          });

          this.geoTargetingInfoService.showInfo({
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
  setSuggestedRadius = (item: GeoTargetingItem): Observable<GeoTargetingItem> => {
    return Observable.create((observer) => {
      switch (item.type) {
        case 'city':
          item = GeoTargetingRadiusService.setDefaultRadius(item, this.translateService.currentLang);
          observer.next(item);
          break;
        case 'custom_location':
        case 'place':
          this.geoTargetingApiService.suggestRadius(item)
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
   * @returns {GeoTargetingItem}
   * @param items
   */
  setCoordinates = (items: GeoTargetingItem[]): Observable<GeoTargetingItem[]> => {
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

    return this.geoTargetingApiService.metaData(simplifiedGeoLocations)
               .map((metaData) => {
                 let extendedItems: GeoTargetingItem[] = [];

                 for (let mappedType in metaData) {
                   if (metaData.hasOwnProperty(mappedType)) {
                     extendedItems = [...extendedItems, ...Object.values(metaData[mappedType])];
                   }
                 }

                 return extendedItems;
               });
  };

  extendItems (items: GeoTargetingItem[]) {
    return this.setCoordinates(items)
               .mergeMap((extendedItems) => {
                   return Observable.forkJoin(
                     extendedItems.map((extendedItem) => this.setSuggestedRadius(extendedItem))
                   );
                 }
               )
               .switchMap((extendedItems) => {
                 return this._store.let(this.geoTargetingModeService.getModel)
                            .take(1)
                            .map(({selectedMode}) => selectedMode.id === 'exclude')
                            .map((excluded) => extendedItems.map((item) => Object.assign(item, {excluded})));
               });
  }

  addItems (items: GeoTargetingItem[]) {
    this.extendItems(items)
        .do((extendedItems) => {
          this._store.dispatch(this.geoTargetingSelectedActions.addItems(extendedItems));
        })
        .switchMap(() => this.model$.take(1))
        .subscribe({
          next:  () => {
            this.informAboutReplaced(items);
          },
          error: (error) => {
            if (error instanceof SdkError) {
              this.geoTargetingInfoService.showInfo({level: 'error', message: error.message});
            }
          }
        });
  }

  setItems (items: GeoTargetingItem[]) {
    this._store.dispatch(this.geoTargetingSelectedActions.setItems(items));
  }

  updateItems (items: GeoTargetingItem[]) {
    this._store.dispatch(this.geoTargetingSelectedActions.updateItems(items));
  }

  removeItems (items: GeoTargetingItem[]) {
    this._store.dispatch(this.geoTargetingSelectedActions.removeItems(items));
  }

  /**
   * Return final targeting spec with included and excluded locations
   * @returns {TargetingSpec}
   */
  getSpec () {
    const initialSpec$ = this._store.let(this.geoTargetingLocationTypeService.getModel)
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
               private geoTargetingApiService: GeoTargetingApiService,
               private geoTargetingLocationTypeService: GeoTargetingLocationTypeService,
               private geoTargetingSelectedActions: GeoTargetingSelectedActions,
               private geoTargetingModeService: GeoTargetingModeService,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private geoTargetingIdService: GeoTargetingIdService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(this.getModel);
  }
}
