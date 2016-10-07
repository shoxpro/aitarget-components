import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input.service';
import { GeoTargetingDropdownService } from '../geo-targeting-dropdown/geo-targeting-dropdown.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { CustomLocation } from '../../targeting/targeting-spec-geo.interface';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';

@Component({
  selector:        'geo-targeting-input',
  templateUrl:     './geo-targeting-input.component.html',
  styleUrls:       ['./geo-targeting-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInputComponent implements OnInit, OnDestroy {

  private term;
  private hasFocus;
  private _subscriptions = [];
  private dropdownActive;
  private foundItems;
  private hasSelected;
  private mapActive;
  private latLngRegex    = /[(]?([\s]*[\-]?[\s]*\d{1,3}\.\d{4,6})[\s]*\,([\s]*[\-]?[\s]*\d{1,3}\.\d{4,6})[\s]*[)]?/;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  /**
   * On key up handler.
   * @param term
   */
  public keyup (term: string) {
    this.GeoTargetingInputService.setTerm(term);
  }

  /**
   * Open dropdown with suggestions when gets focus
   */
  public focus () {
    this.GeoTargetingInputService.focus();
    this.GeoTargetingDropdownService.open();
  }

  /**
   * Process focus lost
   */
  public blur () {
    this.GeoTargetingInputService.blur();
  }

  constructor (private GeoTargetingApiService: GeoTargetingApiService,
               private GeoTargetingInputService: GeoTargetingInputService,
               private TranslateService: TranslateService,
               private GeoTargetingInfoService: GeoTargetingInfoService,
               private GeoTargetingDropdownService: GeoTargetingDropdownService,
               private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private GeoTargetingMapService: GeoTargetingMapService,
               private ElementRef: ElementRef,
               private ChangeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.GeoTargetingInputService.term
          .debounceTime(500)
          .filter((term: string) => !this.latLngRegex.test(term))
          .distinctUntilChanged()
          .subscribe((term: string) => {
            this.term = term;

            if (term) {
              this.GeoTargetingApiService.search(term)
                  .subscribe((items) => {
                    this.foundItems = items;
                    this.GeoTargetingDropdownService.update(this.foundItems);
                  });
            } else {
              this.foundItems = null;
              this.GeoTargetingDropdownService.update(this.foundItems);
              this.GeoTargetingDropdownService.close();
            }

            this.updateTemplate();
          })
    );

    this._subscriptions.push(
      this.GeoTargetingInputService.term
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
          .flatMap(this.GeoTargetingSelectedService.setCoordinates)
          .subscribe((item: any) => {
            console.log(`item: `, item);
            // Show message if coordinates don't belong to any country (e.g. deep-deep ocean)
            if (!item.country_code) {
              console.log('should show info block');
              let message = this.TranslateService.instant(`geo-targeting-input.INVALID_LOCATION`);

              this.GeoTargetingInfoService.update('info', message);
              this.GeoTargetingInfoService.show();

              return;
            }

            this.GeoTargetingDropdownService.update([item]);
            this.updateTemplate();
          })
    );

    /**
     * Process dropdown open/close for proper ngClasses
     */
    this._subscriptions.push(
      this.GeoTargetingDropdownService.isOpen.subscribe((isOpen) => {
        this.dropdownActive = isOpen && this.foundItems && this.foundItems.length;
        this.updateTemplate();
      })
    );

    /**
     * Process input focus/blur for proper ngClasses
     */
    this._subscriptions.push(
      this.GeoTargetingInputService.hasFocus.subscribe((hasFocus) => {
        this.hasFocus    = hasFocus;
        let inputElement = this.ElementRef.nativeElement.querySelector('input');

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
      this.GeoTargetingSelectedService.items.subscribe((items: GeoTargetingItem[]) => {
        this.hasSelected = items && items.length;
        this.updateTemplate();
      })
    );

    /**
     * Update component's translations on language change
     */
    this._subscriptions.push(
      this.TranslateService.onLangChange.subscribe(() => {
        this.updateTemplate();
      })
    );

    /**
     * Subscribe to map's activity change for proper input ngClasses
     */
    this._subscriptions.push(
      this.GeoTargetingMapService.mapActive.subscribe((mapActive) => {
        this.mapActive = mapActive;
        this.updateTemplate();
      })
    );
  }

}
