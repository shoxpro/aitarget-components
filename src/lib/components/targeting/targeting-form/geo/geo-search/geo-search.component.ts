import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { GeoSearchService } from './geo-search.service';
import { Subject } from 'rxjs';
import { GeoService } from '../geo.service';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { GeoModeService } from '../geo-mode/geo-mode.service';
import { GeoInfoService } from '../geo-info/geo-info.service';
import { GeoTypeService } from '../geo-type/geo-type.service';
import { escape$ } from '../../../../../shared/constants/event-streams.constants';
import { AppState } from '../../../../../../app/reducers/index';

@Component({
  selector:        'fba-geo-search',
  templateUrl:     'geo-search.html',
  styleUrls:       ['geo-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoSearchComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  modelMode$;
  modelSearchType$;
  model$;
  hasSelected$;
  modelInfo$;

  focus () {
    this.geoSearchService.focus();
    this.geoSearchService.toggleDropdown(true);
  }

  blur () {
    this.geoSearchService.blur();
  }

  toggleDropdown (isDropdownOpen: boolean) {
    this.geoSearchService.toggleDropdown(isDropdownOpen);
  }

  toggleMap (isOpen: boolean) {
    this.geoSearchService.toggleMap(isOpen);
  }

  inputValueEnter (inputValue) {
    /**
     * Async task that should be run inside angular Zone.
     * Allow proper change detection when is used outside on angular 2 (e.g. angular 1 apps)
     **/
    this.ngZone.run(() => {
      this.geoSearchService.processInputValue(inputValue);
    });
  }

  inputValueChange (inputValue) {
    if (inputValue.indexOf(';') > -1) {
      return;
    }

    if (inputValue) {
      /**
       * Async task that should be run inside angular Zone.
       * Allow proper change detection when is used outside on angular 2 (e.g. angular 1 apps)
       **/
      this.ngZone.run(() => {
        this.geoSearchService.processInputValue(inputValue);
      });
    } else {
      this.geoSearchService.reset();
    }
  }

  select (item) {
    /**
     * Async task that should be run inside angular Zone.
     * Allow proper change detection when is used outside on angular 2 (e.g. angular 1 apps)
     **/
    this.ngZone.run(() => {
      this.geoSelectedService.addItems([item]);
      this.geoSearchService.reset();
    });
  };

  constructor (private _store: Store<AppState>,
               private ngZone: NgZone,
               private geoSearchService: GeoSearchService,
               private geoSelectedService: GeoSelectedService,
               private geoModeService: GeoModeService,
               private geoInfoService: GeoInfoService,
               private geoTypeService: GeoTypeService,
               private geoService: GeoService) {
    this.model$           = this._store.let(this.geoSearchService.getModel);
    this.modelInfo$       = this._store.let(this.geoInfoService.getModel);
    this.modelMode$       = this._store.let(this.geoModeService.getModel);
    this.modelSearchType$ = this._store.let(this.geoTypeService.getModel);
    this.hasSelected$     = this._store
                                .let(this.geoSelectedService.getModel)
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
      .merge(this.geoService.fbaClickOutsideOfComponent$)
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
      .merge(this.geoService.fbaClickOutsideOfComponent$)
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
        .subscribe((inputValue) => this.geoSearchService.processInputValue(inputValue));

  }
}
