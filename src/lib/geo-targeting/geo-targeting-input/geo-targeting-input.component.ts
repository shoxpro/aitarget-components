import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input.service';
import { GeoTargetingDropdownService } from '../geo-targeting-dropdown/geo-targeting-dropdown.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { CustomLocation } from '../../targeting/targeting-spec-geo.interface';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingService } from '../geo-targeting.service';
import { Store } from '@ngrx/store';
import { typeModel } from '../geo-targeting-type/geo-targeting-type.model';
import { AppState } from '../../../app/reducers/index';
import { Subject } from 'rxjs/Rx';

@Component({
  selector:        'geo-targeting-input',
  templateUrl:     './geo-targeting-input.component.html',
  styleUrls:       ['./geo-targeting-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInputComponent implements OnInit, OnDestroy {

  term;
  hasFocus;
  dropdownActive;
  foundItems;
  hasSelected;
  mapActive;
  inputElement;
  latLngRegex = /[(]?([\s]*[\-]?[\s]*\d{1,3}\.\d{4,6})[\s]*,([\s]*[\-]?[\s]*\d{1,3}\.\d{4,6})[\s]*[)]?/;
  destroy$    = new Subject();

  /**
   * Search locations for passed term
   * @param term
   */
  searchTerm (term = this.term) {
    if (term) {
      this.geoTargetingApiService.search(term)
          .subscribe((items) => {
            this.foundItems = items;
            this.geoTargetingDropdownService.update(this.foundItems);
          });
    } else {
      this.foundItems = null;
      this.geoTargetingDropdownService.update(this.foundItems);
      this.geoTargetingDropdownService.close();
    }
  }

  /**
   * On key up handler.
   * @param term
   */
  keyup (term: string) {
    this.geoTargetingInputService.setTerm(term);
  }

  /**
   * Open dropdown with suggestions when gets focus
   */
  focus () {
    this.geoTargetingInputService.focus();
    this.geoTargetingDropdownService.open();
  }

  /**
   * Process focus lost
   */
  blur () {
    this.geoTargetingInputService.blur();
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingApiService: GeoTargetingApiService,
               private geoTargetingInputService: GeoTargetingInputService,
               private translateService: TranslateService,
               private geoTargetingService: GeoTargetingService,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private geoTargetingDropdownService: GeoTargetingDropdownService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingMapService: GeoTargetingMapService,
               private elementRef: ElementRef) {}

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    // Set input element once on init
    this.inputElement = this.elementRef.nativeElement.querySelector('input');

    /**
     * Update term
     */
    this.geoTargetingInputService.term
        .takeUntil(this.destroy$)
        .subscribe((term) => this.term = term);

    /**
     * Update dropdown when type for search changes
     */
    this._store.let(typeModel)
        .takeUntil(this.destroy$)
        .map(({selectedType}) => selectedType)
        .distinctUntilChanged()
        .subscribe(() => this.searchTerm());

    /**
     * Check if input term is not a coordinate and search for new items
     */
    this.geoTargetingInputService.term
        .takeUntil(this.destroy$)
        .debounceTime(500)
        .filter((term) => !this.latLngRegex.test(term))
        .distinctUntilChanged()
        .subscribe((term) => this.searchTerm());

    /**
     * Check input term for matching geo coordinates
     */
    this.geoTargetingInputService.term
        .takeUntil(this.destroy$)
        .filter((term: string) => this.latLngRegex.test(term))
        .map((term: string) => term.replace(/[\s]*/, ''))
        .distinctUntilChanged()
        .map((term: string) => {
          let matches   = term.match(this.latLngRegex);
          let latitude  = Number(matches[1]);
          let longitude = Number(matches[2]);
          let key       = `(${latitude}, ${longitude})`;
          return (<CustomLocation>{
            key:       key,
            name:      key,
            latitude:  latitude,
            longitude: longitude,
            type:      'custom_location'
          });
        })
        .flatMap(this.geoTargetingSelectedService.setCoordinates)
        .subscribe((item: any) => {
          // Show message if coordinates don't belong to any country (e.g. deep-deep ocean)
          if (!item.country_code) {
            let message = this.translateService.instant(`geo-targeting-input.INVALID_LOCATION`);

            this.geoTargetingInfoService.update('info', message);
            this.geoTargetingInfoService.show();

            return;
          }

          this.geoTargetingDropdownService.update([item]);
        });

    /**
     * Process dropdown open/close for proper ngClasses
     */
    this.dropdownActive = this.geoTargetingDropdownService.isOpen
                              .map((isOpen) => isOpen && this.foundItems && this.foundItems.length);

    /**
     * Process input focus/blur for proper ngClasses
     */
    this.hasFocus = this.geoTargetingInputService.hasFocus
                        .do((hasFocus) => {
                          if (hasFocus) {
                            this.inputElement.focus();
                          } else {
                            this.inputElement.blur();
                          }
                        });

    /**
     * Subscribe to selected items change for proper input ngClasses
     */
    this.hasSelected = this.geoTargetingSelectedService.items
                           .map((items) => items && items.length);

    /**
     * Subscribe to map's activity change for proper input ngClasses
     */
    this.mapActive = this.geoTargetingMapService.mapActive;

    /**
     * Process Escape and clicked outside when dropdown is open
     */
    this.geoTargetingService.clickOutsideOfGeoStream
        .takeUntil(this.destroy$)
        .merge(this.geoTargetingService.escapeStream)
        .filter(() => this.hasFocus)
        .subscribe(() => this.geoTargetingInputService.blur());
  }

}
