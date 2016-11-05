import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs/Rx';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSpec, Key, City, CustomLocation } from '../../targeting/targeting-spec-geo.interface';
import { TargetingSpec } from '../../targeting/targeting-spec.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingLocationTypeService } from '../geo-targeting-location-type/geo-targeting-location-type.service';
import { GeoTargetingRadiusService } from '../geo-targeting-radius/geo-targeting-radius.service';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingSelectedState, GEO_TARGETING_SELECTED_KEY } from './geo-targeting-selected.reducer';
import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.interface';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service.new';

@Injectable()
export class GeoTargetingSelectedServiceOld {

  _items                             = new BehaviorSubject<GeoTargetingItem[]>([]);
  items                              = this._items.asObservable();
  _prevItems: GeoTargetingItem[]     = [];
  _replacedItems: GeoTargetingItem[] = [];
  typeMap                            = {
    country:            'countries',
    region:             'regions',
    city:               'cities',
    zip:                'zips',
    geo_market:         'geo_markets',
    electoral_district: 'electoral_districts',
    custom_location:    'custom_locations'
  };
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

    this.geoTargetingInfoService.showInfo({level: 'error', message, canRevert: false});
  }

  /**
   * Show info message that it is impossible to exclude location that is broader that included one
   */
  informAboutNarrow (narrowerLocations) {
    let message = this.translateService.instant(`geo-targeting-info.MESSAGE_NARROW`, {
      narrowerLocationNames: narrowerLocations.map(item => item.name)
                                              .join(', ')
    });

    this.geoTargetingInfoService.showInfo({level: 'error', message, canRevert: false});
  }

  /**
   * Show info message that some locations were replaced
   */
  informAboutReplaced (item: GeoTargetingItem) {
    let replacedItems = this.getReplacedItems();
    let fromNames     = replacedItems
      .map((replacedItem) => replacedItem.name)
      .join(', ');

    let message = this.translateService.instant(`geo-targeting-info.MESSAGE`, {
      fromNames: fromNames,
      toName:    item.name
    });

    this.geoTargetingInfoService.showInfo({level: 'info', message, canRevert: true});
  }

  /**
   * Get list of broader locations for passed item
   * @param item
   * @returns {GeoTargetingItem[]}
   */
  getBroaderLocations (item: GeoTargetingItem) {
    return this.get()
               .filter((selectedItem: GeoTargetingItem) => {
                 return (
                   /*country of passed item is selected*/
                   selectedItem.key === item.country_code ||
                   /*region of passed item is selected*/
                   (item.region_id && selectedItem.key === item.region_id.toString()) ||
                   /*city of passed item is selected*/
                   (item.primary_city_id && selectedItem.key === item.primary_city_id.toString())
                 );
               });
  }

  /**
   * Fet list of narrower locations for passed item
   * @param item
   * @returns {GeoTargetingItem[]}
   */
  getNarrowerLocations (item: GeoTargetingItem) {
    return this.get()
               .filter((selectedItem: GeoTargetingItem) => {
                 return (
                   /*passed item is a country of selected item*/
                   selectedItem.country_code === item.key ||
                   /*passed item is a region of selected item*/
                   (selectedItem.region_id && selectedItem.region_id.toString() === item.key) ||
                   /*passed item is a zip code of selected item*/
                   (selectedItem.primary_city_id && selectedItem.primary_city_id.toString() === item.key)
                 );
               });
  }

  /**
   * Set suggested radius for passed location
   * @param item
   */
  setSuggestedRadius = (item: GeoTargetingItem) => {
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
    });
  };

  /**
   * Set latitude, longitude or optional polygons for passed item
   * @param item
   * @returns {GeoTargetingItem}
   */
  setCoordinates = (item: GeoTargetingItem) => {
    let _item                  = new Subject();
    let simplifiedGeoLocations = {};
    let mappedType             = this.typeMap[item.type];
    let key: string | number   = item.key;

    simplifiedGeoLocations[mappedType] = [];

    if (item.type === 'regions' || item.type === 'cities') {
      key = Number(item.key);
    }

    simplifiedGeoLocations[mappedType].push(key);

    this.geoTargetingApiService.metaData(simplifiedGeoLocations)
        .subscribe((metaData) => {
          item = Object.assign(item, metaData[mappedType][item.key]);

          _item.next(item);
        });

    return _item.asObservable();
  };

  /**
   * Return list of selected items
   * @returns {GeoTargetingItem[]}
   */
  get () {
    return this._items.getValue();
  }

  /**
   * Return list of previously selected items
   * @returns {GeoTargetingItem[]}
   */
  getPrevItems () {
    return this._prevItems;
  }

  /**
   * Return list of items that were replaced by last added item
   * @returns {GeoTargetingItem[]}
   */
  getReplacedItems () {
    return this._replacedItems;
  }

  /**
   * Update selected items and save previous selection
   * @param items
   */
  update (items: GeoTargetingItem[]) {
    this._prevItems = this.get();
    this._items.next(items);
  }

  /**
   * Add new item to selected list
   * Check for broader and narrower locations if item is excluded
   * Replace broader
   * @param item
   * @returns {undefined}
   */
  add (item: GeoTargetingItem) {
    let selectedLocations = this.get();
    let broaderLocations  = this.getBroaderLocations(item);
    let narrowerLocations = this.getNarrowerLocations(item);

    // If has narrower locations that are included
    let includedNarrowerLocations = narrowerLocations.filter(narrowerItem => !narrowerItem.excluded);
    if (item.excluded && includedNarrowerLocations.length) {
      return this.informAboutNarrow(includedNarrowerLocations);
    }

    // If has no included locations
    let includedLocations = selectedLocations.filter(selectedItem => !selectedItem.excluded);
    if (item.excluded && !includedLocations.length) {
      return this.informAboutMissingIncludedLocation();
    }

    // Hide all existing info messages
    this.geoTargetingInfoService.hideInfo();

    // Replaced item is an item that is broader or narrower than passed item and has the same mode (excluded flag)
    this._replacedItems = broaderLocations.concat(narrowerLocations)
                                          .filter((replacedItem) => {
                                            return replacedItem.excluded === item.excluded;
                                          });
    // Inform that some items were replaced
    if (this._replacedItems.length) {
      this.informAboutReplaced(item);
    }

    // Filter out selected items from broader and narrower items
    let selectedItems = this.get()
                            .filter((selectedItem: GeoTargetingItem) => {
                              let hasSameMode = selectedItem.excluded === item.excluded;
                              let toReplace   = hasSameMode && this._replacedItems.indexOf(selectedItem) > -1;
                              return !toReplace;
                            });

    this.setCoordinates(item)
        .flatMap(this.setSuggestedRadius)
        .subscribe((extendedItem: GeoTargetingItem) => {

          selectedItems.unshift(extendedItem);

          this.update(selectedItems);
        });

  }

  /**
   * Update one of selected items
   * @param item
   */
  updateSelectedItem (item: GeoTargetingItem) {
    let selectedItems = this.get();
    selectedItems.map((selectedItem: GeoTargetingItem) => {
      if (selectedItem.key === item.key) {
        // Update selectedItem
        selectedItem = Object.assign(selectedItem, item);
      }
      return selectedItem;
    });

    this.update(selectedItems);
  }

  /**
   * Remove passed item from selected list
   * @param item
   */
  remove (item: GeoTargetingItem) {
    let selectedItems     = this._items.getValue();
    let narrowerLocations = this.getNarrowerLocations(item);

    // Filter out passed item and narrower excluded locations
    selectedItems = selectedItems.filter((selectedItem: GeoTargetingItem) => {
      return selectedItem.key !== item.key && narrowerLocations.indexOf(selectedItem) < 0;
    });

    this.update(selectedItems);
  }

  /**
   * Return final targeting spec with included and excluded locations
   * @returns {TargetingSpec}
   */
  getSpec () {
    let locationTypes;
    this._store.let(GeoTargetingLocationTypeService.getModel)
        .take(1)
        .map(({selectedType}) => selectedType)
        .subscribe((selectedType) => locationTypes = selectedType.value);

    let geoLocations: GeoTargetingSpec = {
      location_types: locationTypes
    };

    let excludedGeoLocations: GeoTargetingSpec = {};

    let locations: GeoTargetingSpec = {};

    let selectedItems: GeoTargetingItem[] = this.get();

    selectedItems.forEach((item: GeoTargetingItem) => {
      // Switch location types depending on item mode
      if (item.excluded) {
        locations = excludedGeoLocations;
      } else {
        locations = geoLocations;
      }

      locations[this.typeMap[item.type]] = locations[this.typeMap[item.type]] || [];

      if (item.type === 'country') {
        locations[this.typeMap[item.type]].push(item.key);
      } else {
        let selectedValue: Key = {key: item.key, name: item.name};

        if (item.type === 'city') {
          (<City>selectedValue).radius        = item.radius;
          (<City>selectedValue).distance_unit = item.distance_unit;
        }

        if (item.type === 'custom_location') {
          (<CustomLocation>selectedValue).radius        = item.radius;
          (<CustomLocation>selectedValue).distance_unit = item.distance_unit;
          (<CustomLocation>selectedValue).latitude      = item.latitude;
          (<CustomLocation>selectedValue).longitude     = item.longitude;
          (<CustomLocation>selectedValue).name          = item.name;
          if (item.address_string !== item.name) {
            (<CustomLocation>selectedValue).address_string = item.address_string;
          }
        }

        locations[this.typeMap[item.type]].push(selectedValue);
      }
    });

    return <TargetingSpec> {
      geo_locations:          geoLocations,
      excluded_geo_locations: excludedGeoLocations
    };
  }

  constructor (private _store: Store<AppState>,
               private translateService: TranslateService,
               private geoTargetingApiService: GeoTargetingApiService,
               private geoTargetingInfoService: GeoTargetingInfoService) {
    this.model$ = this._store.let(GeoTargetingSelectedService.getModel);
  }

}
