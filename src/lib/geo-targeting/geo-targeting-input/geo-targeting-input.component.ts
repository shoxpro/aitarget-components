import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input.service';
import { GeoTargetingDropdownService } from '../geo-targeting-dropdown/geo-targeting-dropdown.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';

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
