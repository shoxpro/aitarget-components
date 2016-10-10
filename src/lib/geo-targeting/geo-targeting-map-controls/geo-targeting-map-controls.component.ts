import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';

@Component({
  selector:        'geo-targeting-map-controls',
  templateUrl:     './geo-targeting-map-controls.component.html',
  styleUrls:       ['./geo-targeting-map-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingMapControlsComponent implements OnInit, OnDestroy {
  private _subscriptions = [];

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  public togglePinMode () {
    this.GeoTargetingMapService.togglePinMode();
  }

  constructor (private GeoTargetingMapService: GeoTargetingMapService,
               private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
  }

}
