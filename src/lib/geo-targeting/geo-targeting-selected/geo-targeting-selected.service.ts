import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSpec, Key, City } from '../../targeting/targeting-spec-geo.interface';
import { TargetingSpec } from '../../targeting/targeting-spec.interface';

@Injectable()
export class GeoTargetingSelectedService {

  private _items                             = new BehaviorSubject<GeoTargetingItem[]>([]);
  public items                               = this._items.asObservable();
  private _prevItems: GeoTargetingItem[]     = [];
  private _replacedItems: GeoTargetingItem[] = [];

  public get () {
    return this._items.getValue();
  }

  public getPrevItems () {
    return this._prevItems;
  }

  public getReplacedItems () {
    return this._replacedItems;
  }

  public update (items: GeoTargetingItem[]) {
    this._prevItems = this.get();
    this._items.next(items);
  }

  public add (item: GeoTargetingItem) {
    let selectedItems   = this._items.getValue();
    this._replacedItems = [];

    selectedItems = selectedItems.filter((selectedItem: GeoTargetingItem) => {
      let hasSameMode = selectedItem.excluded === item.excluded;
      let toReplace   =
            hasSameMode &&
            (
              /*replace selected region, city, zip, geo_market and electoral_district*/
              selectedItem.country_code === item.key ||
              /*replace selected country*/
              selectedItem.key === item.country_code ||
              /*replace selected region*/
              (item.region_id && selectedItem.key === item.region_id.toString()) ||
              /*replace selected city and zip*/
              (selectedItem.region_id && selectedItem.region_id.toString() === item.key) ||
              /*replace selected city*/
              (item.primary_city_id && selectedItem.key === item.primary_city_id.toString()) ||
              /*replace selected zip*/
              (selectedItem.primary_city_id && selectedItem.primary_city_id.toString() === item.key)
            );

      if (toReplace) {
        this._replacedItems.push(selectedItem);
      }

      return !toReplace;
    });

    selectedItems.push(item);

    this.update(selectedItems);
  }

  public remove (item: GeoTargetingItem) {
    let selectedItems = this._items.getValue();

    // Filter out passed item
    selectedItems = selectedItems.filter((selectedItem: GeoTargetingItem) => {
      return selectedItem.key !== item.key;
    });

    this.update(selectedItems);
  }

  public getSpec () {
    let typeMap = {
      country:            'countries',
      region:             'regions',
      city:               'cities',
      zip:                'zips',
      geo_market:         'geo_markets',
      electoral_district: 'electoral_districts',
    };

    let geoLocations: GeoTargetingSpec = {
      location_types: ['home']
    };

    let excludedGeoLocations: GeoTargetingSpec = {
      location_types: ['home']
    };

    let locations: GeoTargetingSpec = {};

    let selectedItems: GeoTargetingItem[] = this.get();

    selectedItems.forEach((item: GeoTargetingItem) => {
      // Switch location types depending on item mode
      if (item.excluded) {
        locations = excludedGeoLocations;
      } else {
        locations = geoLocations;
      }

      locations[typeMap[item.type]] = locations[typeMap[item.type]] || [];

      if (item.type === 'country') {
        locations[typeMap[item.type]].push(item.key);
      } else {
        let selectedValue: Key = {key: item.key, name: item.name};

        if (item.type === 'city' && item.radius) {
          (<City>selectedValue).radius = item.radius;
        }

        if (item.type === 'city' && item.distance_unit) {
          (<City>selectedValue).distance_unit = item.distance_unit;
        }

        locations[typeMap[item.type]].push(selectedValue);
      }
    });

    return <TargetingSpec> {
      geo_locations:          geoLocations,
      excluded_geo_locations: excludedGeoLocations
    };
  }

  constructor () { }

}
