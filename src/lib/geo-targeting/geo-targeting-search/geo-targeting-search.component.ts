import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingSearchService } from './geo-targeting-search.service';
import { Subject } from 'rxjs';
import { GeoTargetingService } from '../geo-targeting.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';

@Component({
  selector:        'geo-targeting-search',
  templateUrl:     './geo-targeting-search.html',
  styleUrls:       ['./geo-targeting-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingSearchComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  model$;

  focus () {
    this.geoTargetingSearchService.focus();
  }

  blur () {
    this.geoTargetingSearchService.blur();
  }

  toggleMap (isOpen: boolean) {
    this.geoTargetingSearchService.toggleMap(isOpen);
  }

  inputValueChange (inputValue) {
    this.geoTargetingSearchService.processInputValue(inputValue);
  }

  select (item) {
    console.log('select: ', item);
    this.geoTargetingSelectedService.add(item);
    this.geoTargetingSearchService.processInputValue('');
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingSearchService: GeoTargetingSearchService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingService: GeoTargetingService) {
    this.model$ = this._store.let(GeoTargetingSearchService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    /**
     * Blur on Escape
     */
    this.model$
        .takeUntil(this.destroy$)
        .map(({hasFocus}) => hasFocus)
        .distinctUntilChanged()
        .let((hasFocus$) => hasFocus$
          .filter((hasFocus) => hasFocus)
          .switchMap(() => this.geoTargetingService.escapeStream
                               .takeUntil(hasFocus$.skip(1))
                               .take(1))
        )
        .subscribe(() => this.blur());

    /**
     * Close map on Escape and when click outside of geo component
     */
    this.model$
        .takeUntil(this.destroy$)
        .map(({isMapOpen}) => isMapOpen)
        .distinctUntilChanged()
        .let((isMapOpen$) => isMapOpen$
          .filter((isMapOpen) => isMapOpen)
          .switchMap(() => this.geoTargetingService.escapeStream
                               .merge(this.geoTargetingService.clickOutsideOfGeoStream)
                               .takeUntil(isMapOpen$.skip(1))
                               .take(1))
        )
        .subscribe(() => this.toggleMap(false));
  }
}
