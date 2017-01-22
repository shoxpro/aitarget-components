import { Injectable } from '@angular/core';
import { KILOMETER_MIN, MILE_MIN } from './geo-radius.constants';

@Injectable()
export class GeoRadiusService {

  static setDefaultRadius (item, lang = 'en_US') {
    if (lang === 'en_US') {
      item.distance_unit = 'mile';
      item.radius        = item.radius || MILE_MIN;
    } else {
      item.distance_unit = item.distance_unit || 'kilometer';
      item.radius        = item.radius || KILOMETER_MIN;
    }

    return item;
  }
}
