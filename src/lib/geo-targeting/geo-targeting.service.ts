import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingService {

  public bodyClickStream = Observable.fromEvent(window.document.body, 'click');

  public clickOutsideOfGeoStream = this.bodyClickStream.map((e: MouseEvent) => {
    let targetElement       = <HTMLElement>e.target;
    let geoTargetingElement = window.document.querySelector('geo-targeting');
    let clickedInside       = geoTargetingElement.contains(targetElement);
    return geoTargetingElement ? !clickedInside : null;
  })
                                       .filter((clickedOutside) => clickedOutside === true);

  public bodyKeydownStream = Observable.fromEvent(window.document.body, 'keydown');

  public escapeStream    = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 27);
  public enterStream     = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 13);
  public arrowUpStream   = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 38);
  public arrowDownStream = this.bodyKeydownStream.filter((e: KeyboardEvent) => e.keyCode === 40);

  constructor () { }

}
