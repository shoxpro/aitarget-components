import { Injectable } from '@angular/core';

@Injectable()
export class GeoTargetingRadiusService {

  static setDefaultRadius (item, lang = 'en_US') {
    if (lang === 'en_US') {
      item.distance_unit = item.distance_unit || 'mile';
      item.radius        = item.radius || 25;
    } else {
      item.distance_unit = item.distance_unit || 'kilometer';
      item.radius        = item.radius || 40;
    }

    return item;
  }

  constructor () { }

}
