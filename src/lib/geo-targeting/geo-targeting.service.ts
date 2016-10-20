import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingService {

  bodyClickStream = Observable.fromEvent(window.document.body, 'click');

  clickOutsideOfGeoStream = this.bodyClickStream.map((e: MouseEvent) => {
    let targetElement       = <HTMLElement>e.target;
    let geoTargetingElement = window.document.querySelector('geo-targeting');
    let clickedInside       = geoTargetingElement.contains(targetElement);
    return geoTargetingElement ? !clickedInside : null;
  })
                                .filter((clickedOutside) => clickedOutside === true);

  bodyKeydownStream = Observable.fromEvent(window.document.body, 'keydown');

  escapeStream    = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 27);
  enterStream     = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 13);
  arrowUpStream   = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 38);
  arrowDownStream = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 40);

  constructor () { }

}
