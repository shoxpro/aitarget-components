import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input.service';
import { GeoTargetingDropdownService } from '../geo-targeting-dropdown/geo-targeting-dropdown.service';

@Component({
  selector:        'geo-targeting-input',
  templateUrl:     './geo-targeting-input.component.html',
  styleUrls:       ['./geo-targeting-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInputComponent implements OnInit, OnDestroy {

  private term;
  private hasFocus;
  private subscriptions = [];
  private dropdownActive;
  private foundItems;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
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
               private ElementRef: ElementRef,
               private ref: ChangeDetectorRef) {
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.subscriptions.push(
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
    this.subscriptions.push(
      this.GeoTargetingDropdownService.isOpen.subscribe((isOpen) => {
        this.dropdownActive = isOpen && this.foundItems && this.foundItems.length;
        this.updateTemplate();
      })
    );

    /**
     * Process input focus/blur for proper ngClasses
     */
    this.subscriptions.push(
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
     * Update component's translations on language change
     */
    this.subscriptions.push(
      this.TranslateService.onLangChange.subscribe(() => {
        this.updateTemplate();
      })
    );
  }

}
