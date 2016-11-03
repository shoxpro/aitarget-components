import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingSearchService } from './geo-targeting-search.service';
import { Subject } from 'rxjs';
import { GeoTargetingService } from '../geo-targeting.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingSelectedServiceNew } from '../geo-targeting-selected/geo-targeting-selected.service.new';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';

@Component({
  selector:        'geo-targeting-search',
  templateUrl:     './geo-targeting-search.html',
  styleUrls:       ['./geo-targeting-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingSearchComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  mode$;
  model$;
  hasSelected$;

  focus () {
    this.geoTargetingSearchService.focus();
    this.geoTargetingSearchService.toggleDropdown(true);
  }

  blur () {
    this.geoTargetingSearchService.blur();
  }

  toggleDropdown (isDropdownOpen: boolean) {
    this.geoTargetingSearchService.toggleDropdown(isDropdownOpen);
  }

  toggleMap (isOpen: boolean) {
    this.geoTargetingSearchService.toggleMap(isOpen);
  }

  inputValueEnter (inputValue) {
    this.geoTargetingSearchService.processInputValue(inputValue);
  }

  inputValueChange (inputValue) {
    if (inputValue.indexOf(';') > -1) {
      return;
    }

    if (inputValue) {
      this.geoTargetingSearchService.processInputValue(inputValue);
    } else {
      this.geoTargetingSearchService.reset();
    }
  }

  select (item) {
    this.geoTargetingSelectedServiceNew.addItems([item]);
    this.geoTargetingSearchService.processInputValue('');
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingSearchService: GeoTargetingSearchService,
               private geoTargetingSelectedServiceNew: GeoTargetingSelectedServiceNew,
               private geoTargetingService: GeoTargetingService) {
    this.model$       = this._store.let(GeoTargetingSearchService.getModel);
    this.mode$        = this._store.let(GeoTargetingModeService.getModel);
    this.hasSelected$ = this._store
                            .let(GeoTargetingSelectedService.getModel)
                            .map(({items}) => Boolean(items.length))
                            .distinctUntilChanged();
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
        .subscribe(() => {
          this.blur();
          this.toggleDropdown(false);
        });

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
