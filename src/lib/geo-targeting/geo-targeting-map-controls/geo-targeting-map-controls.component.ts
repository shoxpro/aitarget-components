import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';

@Component({
  selector:        'geo-targeting-map-controls',
  templateUrl:     './geo-targeting-map-controls.component.html',
  styleUrls:       ['./geo-targeting-map-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingMapControlsComponent implements OnInit, OnDestroy {
  _subscriptions = [];
  pinMode        = false;
  mode;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  togglePinMode () {
    this.geoTargetingMapService.togglePinMode();
  }

  constructor (private geoTargetingMapService: GeoTargetingMapService,
               private geoTargetingModeService: GeoTargetingModeService,
               private changeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    // Subscribe to map's pin mode flag
    this._subscriptions.push(
      this.geoTargetingMapService.pinMode.subscribe((pinMode) => {
        this.pinMode = pinMode;
        this.updateTemplate();
      })
    );

    // Subscribe to map's pin mode flag
    this._subscriptions.push(
      this.geoTargetingModeService.mode.subscribe((mode) => {
        this.mode = mode;
        this.updateTemplate();
      })
    );
  }

}
