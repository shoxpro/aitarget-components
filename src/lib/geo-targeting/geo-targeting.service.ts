import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { GeoTargetingItem } from './geo-targeting-item.interface';
import { GeoTargetingApiService } from './geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingRadiusService } from './geo-targeting-radius/geo-targeting-radius.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Injectable()
export class GeoTargetingService {

  private typeMap = {
    country:            'countries',
    region:             'regions',
    city:               'cities',
    zip:                'zips',
    geo_market:         'geo_markets',
    electoral_district: 'electoral_districts',
    custom_location:    'custom_locations'
  };

  constructor (private GeoTargetingApiService: GeoTargetingApiService,
               private TranslateService: TranslateService) { }

  /**
   * Set suggested radius for passed location
   * @param item
   */
  public setSuggestedRadius = (item: GeoTargetingItem) => {
    let _item = new Subject();
    this.GeoTargetingApiService.suggestRadius(item)
        .subscribe((suggestedRadius: null | Array<{suggested_radius: number, distance_unit: 'mile' | 'kilometer'}>) => {
          if (!suggestedRadius || !suggestedRadius[0]) {
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
  public setCoordinates = (item: GeoTargetingItem) => {
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
          item = Object.assign(item, metaData[mappedType][item.key]);

          _item.next(item);
        });

    return _item.asObservable();
  };

}
