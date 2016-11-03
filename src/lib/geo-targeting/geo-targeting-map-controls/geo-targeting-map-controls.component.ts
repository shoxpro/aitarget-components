import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'geo-targeting-map-controls',
  templateUrl:     './geo-targeting-map-controls.component.html',
  styleUrls:       ['./geo-targeting-map-controls.component.scss'],
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

  constructor (private _store: Store<AppState>,
               private geoTargetingMapService: GeoTargetingMapService,
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

    this._store.let(GeoTargetingModeService.getModel)
        .subscribe((model) => {
          this.mode = model.selectedMode.id;
        });
  }

}
