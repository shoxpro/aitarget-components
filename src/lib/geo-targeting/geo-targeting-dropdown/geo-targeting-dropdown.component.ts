import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingService } from '../geo-targeting.service';
import { GeoTargetingInputService } from '../geo-targeting-input/geo-targeting-input.service';

@Component({
  selector:        'geo-targeting-dropdown',
  templateUrl:     './geo-targeting-dropdown.component.html',
  styleUrls:       ['./geo-targeting-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingDropdownComponent implements OnInit, OnDestroy {

  private _subscriptions                   = [];
  private items;
  public isOpen;
  public filteredItems: GeoTargetingItem[] = [];
  private activeItemIndex                  = 0;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  /**
   * Filter out already selected items
   * @param items
   * @returns {GeoTargetingItem[]}
   */
  private filterOutSelected (items: GeoTargetingItem[]) {
    if (!items || !items.length) {
      return items;
    }

    let selectedItemsKeys = this.GeoTargetingSelectedService
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
  public closeDropdown () {
    this.GeoTargetingDropdownService.close();
  }

  /**
   * Select location handler
   * @param item
   * @param event
   */
  public selectItem (item: GeoTargetingItem, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    let mode      = this.GeoTargetingModeService.get();
    item.excluded = mode === 'exclude';

    this.GeoTargetingSelectedService.add(item);

    // Reset input text, but keep focus
    this.GeoTargetingInputService.setTerm(null);
    this.GeoTargetingInputService.focus();

    this.closeDropdown();
  }

  constructor (private GeoTargetingDropdownService: GeoTargetingDropdownService,
               private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private GeoTargetingModeService: GeoTargetingModeService,
               private GeoTargetingService: GeoTargetingService,
               private GeoTargetingInputService: GeoTargetingInputService,
               private ChangeDetectorRef: ChangeDetectorRef) { }

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
      this.GeoTargetingDropdownService.items.subscribe((items) => {
        this.items         = items;
        this.filteredItems = this.filterOutSelected(items);

        if (items && items.length) {
          this.GeoTargetingDropdownService.open();
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
      this.GeoTargetingDropdownService.isOpen.subscribe((isOpen: boolean) => {
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
      this.GeoTargetingSelectedService.items.subscribe(() => {
        this.filteredItems = this.filterOutSelected(this.items);
        this.updateTemplate();
      })
    );

    /**
     * Process Escape and clicked outside when dropdown is open
     */
    this._subscriptions.push(
      this.GeoTargetingService.clickOutsideOfGeoStream
          .merge(this.GeoTargetingService.escapeStream)
          .filter(() => this.isOpen)
          .subscribe(() => {
            this.GeoTargetingDropdownService.close();
          })
    );

    /**
     * Process Escape and clicked outside when dropdown is open
     */
    this._subscriptions.push(
      this.GeoTargetingService.arrowUpStream.mapTo(-1)
          .merge(this.GeoTargetingService.arrowDownStream.mapTo(1))
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
      this.GeoTargetingService.enterStream
          .filter(() => this.isOpen)
          .subscribe(() => {
            this.selectItem(this.filteredItems[this.activeItemIndex]);
          })
    );
  }

}
