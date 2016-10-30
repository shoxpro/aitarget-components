import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingService } from '../geo-targeting.service';
import { GeoTargetingInputService } from '../geo-targeting-input/geo-targeting-input.service';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'geo-targeting-dropdown',
  templateUrl:     './geo-targeting-dropdown.component.html',
  styleUrls:       ['./geo-targeting-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingDropdownComponent implements OnInit, OnDestroy {

  _subscriptions                    = [];
  items;
  isOpen;
  filteredItems: GeoTargetingItem[] = [];
  activeItemIndex                   = 0;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Filter out already selected items
   * @param items
   * @returns {GeoTargetingItem[]}
   */
  filterOutSelected (items: GeoTargetingItem[]) {
    if (!items || !items.length) {
      return items;
    }

    let selectedItemsKeys = this.geoTargetingSelectedService
                                .get()
                                .map((selectedItem: GeoTargetingItem) => {
                                  return selectedItem.key;
                                });

    // Filter out already selected items
    return items.filter((item: GeoTargetingItem) => {
      return selectedItemsKeys.indexOf(item.key) < 0;
    });
  }

  /**
   * Close dropdown handler
   */
  closeDropdown () {
    this.geoTargetingDropdownService.close();
  }

  /**
   * Select location handler
   * @param item
   * @param event
   */
  selectItem (item: GeoTargetingItem, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }

    this._store.let(GeoTargetingModeService.getModel)
        .take(1)
        .subscribe(
          (model) => item.excluded = model.mode === 'exclude'
        );

    this.geoTargetingSelectedService.add(item);

    // Reset input text, but keep focus
    this.geoTargetingInputService.setTerm('');
    this.geoTargetingInputService.focus();

    this.closeDropdown();
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingDropdownService: GeoTargetingDropdownService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingService: GeoTargetingService,
               private geoTargetingInputService: GeoTargetingInputService,
               private changeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    /**
     * Update items list and open dropdown if has items
     */
    this._subscriptions.push(
      this.geoTargetingDropdownService.items.subscribe((items) => {
        this.items         = items;
        this.filteredItems = this.filterOutSelected(items);

        if (items && items.length) {
          this.geoTargetingDropdownService.open();
        }

        // Reset active index when items updated
        this.activeItemIndex = 0;

        this.updateTemplate();
      })
    );

    /**
     * Update isOpen flag
     */
    this._subscriptions.push(
      this.geoTargetingDropdownService.isOpen.subscribe((isOpen: boolean) => {
        this.isOpen = isOpen;

        // Reset active index when dropdown closes
        if (!isOpen) {
          this.activeItemIndex = 0;
        }

        this.updateTemplate();
      })
    );

    /**
     * Update items from dropdown when selected changes
     */
    this._subscriptions.push(
      this.geoTargetingSelectedService.items.subscribe(() => {
        this.filteredItems = this.filterOutSelected(this.items);
        this.updateTemplate();
      })
    );

    /**
     * Process Escape and clicked outside when dropdown is open
     */
    this._subscriptions.push(
      this.geoTargetingService.clickOutsideOfGeoStream
          .merge(this.geoTargetingService.escapeStream)
          .filter(() => this.isOpen)
          .subscribe(() => {
            this.geoTargetingDropdownService.close();
          })
    );

    /**
     * Process Escape and clicked outside when dropdown is open
     */
    this._subscriptions.push(
      this.geoTargetingService.arrowUpStream.mapTo(-1)
          .merge(this.geoTargetingService.arrowDownStream.mapTo(1))
          .filter(() => this.isOpen)
          .subscribe((delta) => {
            this.activeItemIndex += delta;

            if (this.activeItemIndex < 0) {
              this.activeItemIndex = this.filteredItems.length - 1;
            }

            if (this.activeItemIndex > this.filteredItems.length - 1) {
              this.activeItemIndex = 0;
            }

            this.updateTemplate();
          })
    );

    /**
     * Add active item on enter
     */
    this._subscriptions.push(
      this.geoTargetingService.enterStream
          .filter(() => this.isOpen)
          .subscribe(() => {
            this.selectItem(this.filteredItems[this.activeItemIndex]);
          })
    );
  }

}
