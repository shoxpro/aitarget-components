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
  private _subscriptions = [];
  private pinMode        = false;
  private mode;

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
               private GeoTargetingModeService: GeoTargetingModeService,
               private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    // Subscribe to map's pin mode flag
    this._subscriptions.push(
      this.GeoTargetingMapService.pinMode.subscribe((pinMode) => {
        this.pinMode = pinMode;
        this.updateTemplate();
      })
    );

    // Subscribe to map's pin mode flag
    this._subscriptions.push(
      this.GeoTargetingModeService.mode.subscribe((mode) => {
        this.mode = mode;
        this.updateTemplate();
      })
    );
  }

}
