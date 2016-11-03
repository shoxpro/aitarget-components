import { Injectable } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { Observable } from 'rxjs';
import { GeoTargetingSelectedState, GEO_TARGETING_SELECTED_KEY } from './geo-targeting-selected.reducer';
import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.interface';
import { GeoTargetingRadiusService } from '../geo-targeting-radius/geo-targeting-radius.service';
import { typeMap } from './geo-targeting-selected.constants';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingSelectedActions } from './geo-targeting-selected.actions';

@Injectable()
export class GeoTargetingSelectedServiceNew {

  static getModel (_store): Observable<GeoTargetingSelectedState> {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_SELECTED_KEY])
                 .distinctUntilChanged();
  }

  /**
   * Set suggested radius for passed location
   * @param item
   */
  setSuggestedRadius = (item: GeoTargetingItem): Observable<GeoTargetingItem> => {
    return Observable.create((observer) => {
      // Request for suggested radius only for cities, custom locations and places
      if (['city', 'custom_location', 'place'].indexOf(item.type) > -1) {
        this.geoTargetingApiService.suggestRadius(item)
            .subscribe((suggestedRadius: null | Array<{suggested_radius: number,
              distance_unit: 'mile' | 'kilometer'}>) => {
              if (!suggestedRadius || !suggestedRadius[0]) {
                if (item.type === 'city') {
                  item = GeoTargetingRadiusService.setDefaultRadius(item, this.translateService.currentLang);
                }
              } else {
                item.radius        = suggestedRadius[0].suggested_radius;
                item.distance_unit = suggestedRadius[0].distance_unit;
              }

              observer.next(item);
            });
      } else {
        observer.next(item);
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

      simplifiedGeoLocations[mappedType] = [];

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
               );
  }

  addItems (items: GeoTargetingItem[]) {
    this.extendItems(items)
        .subscribe((extendedItems) => {
          console.log('extendedItems: ', extendedItems);
          this._store.dispatch(this.geoTargetingSelectedActions.addItems(extendedItems));
        });
  }

  updateItem (item: GeoTargetingItem) {

  }

  removeItems (items: GeoTargetingItem[]) {

  }

  constructor (private _store: Store<AppState>,
               private geoTargetingApiService: GeoTargetingApiService,
               private geoTargetingSelectedActions: GeoTargetingSelectedActions,
               private translateService: TranslateService) {}
}
