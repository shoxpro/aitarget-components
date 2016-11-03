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
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';

@Injectable()
export class GeoTargetingSelectedService {

  model$;

  static getModel (_store): Observable<GeoTargetingSelectedState> {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_SELECTED_KEY])
                 .distinctUntilChanged();
  }

  /**
   * Show info message that excluding is impossible without included locations
   */
  informAboutMissingIncludedLocation () {
    let message = this.translateService.instant(`geo-targeting-info.MESSAGE_MISSING_INCLUDED`);

    this.geoTargetingInfoService.showInfo({level: 'error', message});
  }

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

          this.geoTargetingInfoService.showInfo({level: 'info', message, canRevert: true});
        });
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
                 return this._store.let(GeoTargetingModeService.getModel)
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
        .subscribe(() => {
          this.informAboutReplaced(items);
        });
  }

  setItems (items: GeoTargetingItem[]) {
    this._store.dispatch(this.geoTargetingSelectedActions.addItems(items));
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
    console.log('getSpec');
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingApiService: GeoTargetingApiService,
               private geoTargetingSelectedActions: GeoTargetingSelectedActions,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(GeoTargetingSelectedService.getModel);
  }
}
