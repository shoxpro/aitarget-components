import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input.service';
import { GeoTargetingDropdownService } from '../geo-targeting-dropdown/geo-targeting-dropdown.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingService } from '../geo-targeting.service';
import { Store } from '@ngrx/store';
import { typeModel } from '../geo-targeting-type/geo-targeting-type.model';
import { AppState } from '../../../app/reducers/index';
import { Subject } from 'rxjs/Rx';
import { GeoTargetingSearchService } from '../geo-targeting-search/geo-targeting-search.service';
import { GeoTargetingSearchState } from '../geo-targeting-search/geo-taregting-search.reducer';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';

@Component({
  selector:        'geo-targeting-input',
  templateUrl:     './geo-targeting-input.component.html',
  styleUrls:       ['./geo-targeting-input.component.scss'],
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
  destroy$ = new Subject();

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
               private geoTargetingSearchService: GeoTargetingSearchService,
               private geoTargetingModeService: GeoTargetingModeService,
               private elementRef: ElementRef) {}

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    // Set input element once on init
    this.inputElement = this.elementRef.nativeElement.querySelector('input');

    this._store.let(GeoTargetingSearchService.getModel)
        .take(1)
        .subscribe((model: GeoTargetingSearchState) => {
          this.term = model.inputValue;
        });

    this._store.let(GeoTargetingSearchService.getModel)
        .subscribe((model: GeoTargetingSearchState) => {
          if (model.terms.length <= 1) {
            this.foundItems = model.items;
            this.geoTargetingDropdownService.update(this.foundItems);
          } else {
            let mode = this.geoTargetingModeService.get();
            model.termsMatches.forEach((matched) => {
              matched.item.excluded = mode === 'exclude';
              this.geoTargetingSelectedService.add(matched.item);
              // Reset input text, but keep focus
              this.geoTargetingInputService.setTerm('');
              this.geoTargetingInputService.focus();
            });
            let notFoundInputs = model.termsNotFound.map((term) => term.input)
                                      .join(', ');
            let level          = 'info';
            let message        = `Some names wasn't found: ${notFoundInputs}.`;

            this.geoTargetingInfoService.showInfo({level, message});

            this.foundItems = [];
            this.geoTargetingDropdownService.update(this.foundItems);
          }
          this.term = model.inputValue;
        });

    this.geoTargetingInputService.term
        .takeUntil(this.destroy$)
        .debounceTime(1000)
        .subscribe((term) => {
          this.term = term;
          this.geoTargetingSearchService.processInputValue(term);
          this.geoTargetingSearchService.search();
        });

    /**
     * Update dropdown when type for search changes
     */
    this._store.let(typeModel)
        .takeUntil(this.destroy$)
        .map(({selectedType}) => selectedType)
        .distinctUntilChanged()
        .subscribe(() => this.geoTargetingSearchService.search());

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
