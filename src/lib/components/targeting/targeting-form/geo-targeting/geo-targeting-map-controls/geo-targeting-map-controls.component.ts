import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

@Component({
  selector:        'geo-targeting-map-controls',
  templateUrl:     'geo-targeting-map-controls.component.html',
  styleUrls:       ['geo-targeting-map-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingMapControlsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  modelMode$;

  pinMode = false;

  togglePinMode () {
    this.geoTargetingMapService.togglePinMode();
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingMapService: GeoTargetingMapService,
               private geoTargetingModeService: GeoTargetingModeService,
               private changeDetectorRef: ChangeDetectorRef) {
    this.modelMode$ = this._store.let(this.geoTargetingModeService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    // Subscribe to map's pin mode flag
    this.geoTargetingMapService.pinMode
        .takeUntil(this.destroy$)
        .subscribe((pinMode) => {
          this.pinMode = pinMode;
          this.changeDetectorRef.markForCheck();
        });
  }

}
