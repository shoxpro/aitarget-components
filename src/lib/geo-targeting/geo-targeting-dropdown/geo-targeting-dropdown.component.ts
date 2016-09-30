import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';

@Component({
  selector:        'geo-targeting-dropdown',
  templateUrl:     './geo-targeting-dropdown.component.html',
  styleUrls:       ['./geo-targeting-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingDropdownComponent implements OnInit, OnDestroy {

  private subscriptions = [];
  private items;
  private isOpen;
  private filteredItems;

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
   */
  public selectItem (item: GeoTargetingItem, event: any) {
    event.stopPropagation();
    let mode      = this.GeoTargetingModeService.get();
    item.excluded = mode === 'exclude';
    this.GeoTargetingSelectedService.add(item);
    this.closeDropdown();
  }

  constructor (private GeoTargetingDropdownService: GeoTargetingDropdownService,
               private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private GeoTargetingModeService: GeoTargetingModeService,
               private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    /**
     * Update items list and open dropdown if has items
     */
    this.subscriptions.push(
      this.GeoTargetingDropdownService.items.subscribe((items) => {
        this.items         = items;
        this.filteredItems = this.filterOutSelected(items);

        if (items && items.length) {
          this.GeoTargetingDropdownService.open();
        }

        this.updateTemplate();
      })
    );

    /**
     * Update isOpen flag
     */
    this.subscriptions.push(
      this.GeoTargetingDropdownService.isOpen.subscribe((isOpen: boolean) => {
        this.isOpen = isOpen;
        this.updateTemplate();
      })
    );

    /**
     * Update items from dropdown when selected changes
     */
    this.subscriptions.push(
      this.GeoTargetingSelectedService.items.subscribe(() => {
        this.filteredItems = this.filterOutSelected(this.items);
        this.updateTemplate();
      })
    );
  }

}
