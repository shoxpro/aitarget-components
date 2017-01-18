import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GeoMapService } from '../geo-map/geo-map.service';
import { GeoModeService } from '../geo-mode/geo-mode.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-geo-map-controls',
  templateUrl:     'geo-map-controls.component.html',
  styleUrls:       ['geo-map-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoMapControlsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  modelMode$;

  pinMode = false;

  togglePinMode () {
    this.geoMapService.togglePinMode();
  }

  constructor (private _store: Store<AppState>,
               private geoMapService: GeoMapService,
               private geoModeService: GeoModeService,
               private changeDetectorRef: ChangeDetectorRef) {
    this.modelMode$ = this._store.let(this.geoModeService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    // Subscribe to map's pin mode flag
    this.geoMapService.pinMode
        .takeUntil(this.destroy$)
        .subscribe((pinMode) => {
          this.pinMode = pinMode;
          this.changeDetectorRef.markForCheck();
        });
  }

}
