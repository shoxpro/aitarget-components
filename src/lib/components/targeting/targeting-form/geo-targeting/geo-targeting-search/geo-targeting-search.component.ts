import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GeoTargetingSearchService } from './geo-targeting-search.service';
import { Subject } from 'rxjs';
import { GeoTargetingService } from '../geo-targeting.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingTypeService } from '../geo-targeting-type/geo-targeting-type.service';
import { escape$ } from '../../../../../shared/constants/event-streams.constants';
import { AppState } from '../../../../../../app/reducers/index';

@Component({
  selector:        'geo-targeting-search',
  templateUrl:     'geo-targeting-search.html',
  styleUrls:       ['geo-targeting-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingSearchComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  modelMode$;
  modelSearchType$;
  model$;
  hasSelected$;
  modelInfo$;

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
    this.geoTargetingSelectedService.addItems([item]);
    this.geoTargetingSearchService.reset();
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingSearchService: GeoTargetingSearchService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingModeService: GeoTargetingModeService,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private geoTargetingTypeService: GeoTargetingTypeService,
               private geoTargetingService: GeoTargetingService) {
    this.model$           = this._store.let(this.geoTargetingSearchService.getModel);
    this.modelInfo$       = this._store.let(this.geoTargetingInfoService.getModel);
    this.modelMode$       = this._store.let(this.geoTargetingModeService.getModel);
    this.modelSearchType$ = this._store.let(this.geoTargetingTypeService.getModel);
    this.hasSelected$     = this._store
                                .let(this.geoTargetingSelectedService.getModel)
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
    escape$
      .takeUntil(this.destroy$)
      .merge(this.geoTargetingService.clickOutsideOfComponent$)
      .withLatestFrom(this.model$
                          .map(({hasFocus}) => hasFocus)
                          .distinctUntilChanged())
      .filter(([, hasFocus]) => hasFocus)
      .subscribe(() => {
        this.blur();
        this.toggleDropdown(false);
      });

    /**
     * Close dropdown and map when info visibility changes from true to false
     */
    this.modelInfo$
        .takeUntil(this.destroy$)
        .map(({isVisible}) => isVisible)
        .distinctUntilChanged()
        .filter((isVisible) => !isVisible)
        .subscribe(() => {
          this.toggleMap(false);
          this.toggleDropdown(false);
        });

    /**
     * Close map and dropdown on Escape and when click outside of geo component
     */
    escape$
      .takeUntil(this.destroy$)
      .merge(this.geoTargetingService.clickOutsideOfComponent$)
      .withLatestFrom(this.model$
                          .map(({isMapOpen, isDropdownOpen}) => ({isMapOpen, isDropdownOpen}))
                          .distinctUntilChanged())
      .filter(([, {isMapOpen, isDropdownOpen}]) => isMapOpen || isDropdownOpen)
      .subscribe(([, {isMapOpen, isDropdownOpen}]) => {
        if (isMapOpen) {
          this.toggleMap(false);
        }

        if (isDropdownOpen) {
          this.toggleDropdown(false);
        }
      });

    /**
     * Repeat search when search type changes
     */
    this.modelSearchType$
        .takeUntil(this.destroy$)
        .map(({selectedType}) => selectedType)
        .distinctUntilChanged()
        .switchMap(() => {
          return this.model$.take(1)
                     .filter(({inputValue}) => Boolean(inputValue))
                     .map(({inputValue}) => inputValue);
        })
        .subscribe((inputValue) => this.geoTargetingSearchService.processInputValue(inputValue));

  }
}
