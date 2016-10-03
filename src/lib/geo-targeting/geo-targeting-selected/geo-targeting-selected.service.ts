import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSpec, Key, City } from '../../targeting/targeting-spec-geo.interface';
import { TargetingSpec } from '../../targeting/targeting-spec.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingTypeService } from '../geo-targeting-type/geo-targeting-type.service';
import { GeoTargetingRadiusService } from '../geo-targeting-radius/geo-targeting-radius.service';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';

@Injectable()
export class GeoTargetingSelectedService {

  private _items                             = new BehaviorSubject<GeoTargetingItem[]>([]);
  public items                               = this._items.asObservable();
  private _prevItems: GeoTargetingItem[]     = [];
  private _replacedItems: GeoTargetingItem[] = [];
  private typeMap                            = {
    country:            'countries',
    region:             'regions',
    city:               'cities',
    zip:                'zips',
    geo_market:         'geo_markets',
    electoral_district: 'electoral_districts',
  };

  /**
   * Show info message that excluding is impossible without included locations
   */
  private informAboutMissingBroader () {
    let message = this.TranslateService.instant(`geo-targeting-info.MESSAGE_MISSING_BROADER`);

    this.GeoTargetingInfoService.update('error', message, false);
    this.GeoTargetingInfoService.show();
  }

  /**
   * Show info message that it is impossible to exclude location that is broader that included one
   */
  private informAboutNarrow (narrowerLocations) {
    let message = this.TranslateService.instant(`geo-targeting-info.MESSAGE_NARROW`, {
      narrowerLocationNames: narrowerLocations.map(item => item.name)
                                              .join(', ')
    });

    this.GeoTargetingInfoService.update('error', message, false);
    this.GeoTargetingInfoService.show();
  }

  /**
   * Show info message that some locations were replaced
   */
  private informAboutReplaced (item: GeoTargetingItem) {
    let replacedItems = this.getReplacedItems();
    let fromNames     = replacedItems
      .map((replacedItem) => replacedItem.name)
      .join(', ');

    let message = this.TranslateService.instant(`geo-targeting-info.MESSAGE`, {
      fromNames: fromNames,
      toName:    item.name
    });

    this.GeoTargetingInfoService.update('info', message, true);
    this.GeoTargetingInfoService.show();
  }

  /**
   * Get list of broader locations for passed item
   * @param item
   * @returns {GeoTargetingItem[]}
   */
  private getBroaderLocations (item: GeoTargetingItem) {
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
  private getNarrowerLocations (item: GeoTargetingItem) {
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
  private setSuggestedRadius = (item: GeoTargetingItem) => {
    let _item = new Subject();
    this.GeoTargetingApiService.suggestRadius(item)
        .subscribe((suggestedRadius: null | Array<{suggested_radius: number, distance_unit: 'mile' | 'kilometer'}>) => {
          if (suggestedRadius === null || !suggestedRadius[0]) {
            if (item.type === 'city') {
              item = GeoTargetingRadiusService.setDefaultRadius(item, this.TranslateService.currentLang);
            }
          } else {
            item.radius        = suggestedRadius[0].suggested_radius;
            item.distance_unit = suggestedRadius[0].distance_unit;
          }

          _item.next(item);
        });

    return _item.asObservable();
  };

  /**
   * Set latitude, longitude or optional polygons for passed item
   * @param item
   * @returns {GeoTargetingItem}
   */
  private setCoordinates = (item: GeoTargetingItem) => {
    let _item                  = new Subject();
    let simplifiedGeoLocations = {};
    let mappedType             = this.typeMap[item.type];
    let key: string | number   = item.key;

    simplifiedGeoLocations[mappedType] = [];

    if (item.type === 'regions' || item.type === 'cities') {
      key = Number(item.key);
    }

    simplifiedGeoLocations[mappedType].push(key);

    this.GeoTargetingApiService.metaData(simplifiedGeoLocations)
        .subscribe((metaData) => {
          item.latitude  = metaData[mappedType][item.key].latitude;
          item.longitude = metaData[mappedType][item.key].longitude;
          item.polygons  = metaData[mappedType][item.key].polygons;

          _item.next(item);
        });

    return _item.asObservable();
  };

  /**
   * Return list of selected items
   * @returns {GeoTargetingItem[]}
   */
  public get () {
    return this._items.getValue();
  }

  /**
   * Return list of previously selected items
   * @returns {GeoTargetingItem[]}
   */
  public getPrevItems () {
    return this._prevItems;
  }

  /**
   * Return list of items that were replaced by last added item
   * @returns {GeoTargetingItem[]}
   */
  public getReplacedItems () {
    return this._replacedItems;
  }

  /**
   * Update selected items and save previous selection
   * @param items
   */
  public update (items: GeoTargetingItem[]) {
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
  public add (item: GeoTargetingItem) {
    let broaderLocations  = this.getBroaderLocations(item);
    let narrowerLocations = this.getNarrowerLocations(item);

    // If has narrower locations that are included
    let includedNarrowerLocations = narrowerLocations.filter(narrowerItem => !narrowerItem.excluded);
    if (item.excluded && includedNarrowerLocations.length) {
      return this.informAboutNarrow(includedNarrowerLocations);
    }

    // If has no broader locations that are included
    let includedBroaderLocations = broaderLocations.filter(broaderItem => !broaderItem.excluded);
    if (item.excluded && !includedBroaderLocations.length) {
      return this.informAboutMissingBroader();
    }

    // Hide all existing info messages
    this.GeoTargetingInfoService.hide();

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
          this.GeoTargetingMapService.focusItem(item);
        });

  }

  /**
   * Update one of selected items
   * @param item
   */
  public updateSelectedItem (item: GeoTargetingItem) {
    let selectedItems = this.get();
    selectedItems.map((selectedItem: GeoTargetingItem) => {
      if (selectedItem.key === item.key) {
        // Update selectedItem
        selectedItem = Object.assign(selectedItem, item);
      }
      return selectedItem;
    });

    this.update(selectedItems);
    this.GeoTargetingMapService.focusItem(item);
  }

  /**
   * Remove passed item from selected list
   * @param item
   */
  public remove (item: GeoTargetingItem) {
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
  public getSpec () {
    let geoLocations: GeoTargetingSpec = {
      location_types: this.GeoTargetingTypeService.get()
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

        if (item.type === 'city' && item.radius != null) {
          (<City>selectedValue).radius = item.radius;
        }

        if (item.type === 'city' && item.distance_unit != null) {
          (<City>selectedValue).distance_unit = item.distance_unit;
        }

        locations[this.typeMap[item.type]].push(selectedValue);
      }
    });

    return <TargetingSpec> {
      geo_locations:          geoLocations,
      excluded_geo_locations: excludedGeoLocations
    };
  }

  constructor (private TranslateService: TranslateService,
               private GeoTargetingApiService: GeoTargetingApiService,
               private GeoTargetingInfoService: GeoTargetingInfoService,
               private GeoTargetingMapService: GeoTargetingMapService,
               private GeoTargetingTypeService: GeoTargetingTypeService) {
  }

}
