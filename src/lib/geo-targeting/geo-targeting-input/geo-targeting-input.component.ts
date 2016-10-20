import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input.service';
import { GeoTargetingDropdownService } from '../geo-targeting-dropdown/geo-targeting-dropdown.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { CustomLocation } from '../../targeting/targeting-spec-geo.interface';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingService } from '../geo-targeting.service';

@Component({
  selector:        'geo-targeting-input',
  templateUrl:     './geo-targeting-input.component.html',
  styleUrls:       ['./geo-targeting-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInputComponent implements OnInit, OnDestroy {

  term;
  hasFocus;
  _subscriptions = [];
  dropdownActive;
  foundItems;
  hasSelected;
  mapActive;
  latLngRegex    = /[(]?([\s]*[\-]?[\s]*\d{1,3}\.\d{4,6})[\s]*\,([\s]*[\-]?[\s]*\d{1,3}\.\d{4,6})[\s]*[)]?/;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
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

  constructor (private geoTargetingApiService: GeoTargetingApiService,
               private geoTargetingInputService: GeoTargetingInputService,
               private translateService: TranslateService,
               private geoTargetingService: GeoTargetingService,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private geoTargetingDropdownService: GeoTargetingDropdownService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingMapService: GeoTargetingMapService,
               private elementRef: ElementRef,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    /**
     * Update term
     */
    this._subscriptions.push(
      this.geoTargetingInputService.term.subscribe((term) => {
        this.term = term;
      })
    );

    /**
     * Check if input term isn't a coordinate and search for new items
     */
    this._subscriptions.push(
      this.geoTargetingInputService.term
          .debounceTime(500)
          .filter((term: string) => !this.latLngRegex.test(term))
          .distinctUntilChanged()
          .subscribe((term: string) => {

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

            this.updateTemplate();
          })
    );

    /**
     * Check input term for matching geo coordinates
     */
    this._subscriptions.push(
      this.geoTargetingInputService.term
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
            this.updateTemplate();
          })
    );

    /**
     * Process dropdown open/close for proper ngClasses
     */
    this._subscriptions.push(
      this.geoTargetingDropdownService.isOpen.subscribe((isOpen) => {
        this.dropdownActive = isOpen && this.foundItems && this.foundItems.length;
        this.updateTemplate();
      })
    );

    /**
     * Process input focus/blur for proper ngClasses
     */
    this._subscriptions.push(
      this.geoTargetingInputService.hasFocus.subscribe((hasFocus) => {
        this.hasFocus    = hasFocus;
        let inputElement = this.elementRef.nativeElement.querySelector('input');

        if (hasFocus) {
          inputElement.focus();
        } else {
          inputElement.blur();
        }

        this.updateTemplate();
      })
    );

    /**
     * Subscribe to selected items change for proper input ngClasses
     */
    this._subscriptions.push(
      this.geoTargetingSelectedService.items.subscribe((items: GeoTargetingItem[]) => {
        this.hasSelected = items && items.length;
        this.updateTemplate();
      })
    );

    /**
     * Update component's translations on language change
     */
    this._subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        this.updateTemplate();
      })
    );

    /**
     * Subscribe to map's activity change for proper input ngClasses
     */
    this._subscriptions.push(
      this.geoTargetingMapService.mapActive.subscribe((mapActive) => {
        this.mapActive = mapActive;
        this.updateTemplate();
      })
    );

    /**
     * Process Escape and clicked outside when dropdown is open
     */
    this._subscriptions.push(
      this.geoTargetingService.clickOutsideOfGeoStream
          .merge(this.geoTargetingService.escapeStream)
          .filter(() => this.hasFocus)
          .subscribe(() => {
            this.geoTargetingInputService.blur();
          })
    );
  }

}
