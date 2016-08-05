import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse.service';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-dropdown-browse',
  templateUrl: 'detailed-targeting-dropdown-browse.component.html',
  styleUrls: ['detailed-targeting-dropdown-browse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailedTargetingDropdownBrowseComponent implements OnInit {
  private mode;
  private items;
  public openItems: Object = {
    __ROOT__: true
  };
  private selectedItems;

  constructor (private DetailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
               private DetailedTargetingApiService: DetailedTargetingApiService,
               private DetailedTargetingModeService: DetailedTargetingModeService,
               private DetailedTargetingSelectedService: DetailedTargetingSelectedService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private ref: ChangeDetectorRef) {
    //Load browse items
    this.DetailedTargetingApiService.browse();
  }

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  /**
   * Open or close browse rows when clicked
   * @param item
   */
  private toggleBranch (item: DetailedTargetingItem) {
    //Get all open keys
    let openKeys = Object.keys(this.openItems);
    //Toggle branch by item.key
    this.openItems[item.key] = !Boolean(this.openItems[item.key]);
    //If branch is closed, than close all it's children as well
    if (!this.openItems[item.key] && openKeys.length) {
      openKeys.forEach(key => {
        if (key.indexOf(item.key) > -1) {
          this.openItems[key] = false;
        }
      });
    }
  }

  /**
   * Select row item from the browse list
   * @param item
   */
  private selectItem (item: DetailedTargetingItem) {
    let selectedItems = this.DetailedTargetingSelectedService.get();

    let alreadyAdded: boolean = Boolean(selectedItems.filter(selected => selected.id === item.id).length);

    if (!alreadyAdded) {
      selectedItems.push(item);
    }

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  /**
   * Remove row item from previously selected
   * @param itemToRemove
   */
  private removeItem (itemToRemove: DetailedTargetingItem) {
    let selectedItems = this.DetailedTargetingSelectedService.get();

    selectedItems = selectedItems.filter(item => item.id !== itemToRemove.id);

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  /**
   * Show row's info when hovered
   * @param item
   */
  public setDropdownInfoItem (item: DetailedTargetingItem) {
    let value = item && item.id ? item : null;
    this.DetailedTargetingInfoService.update(value);
  }

  public clickItem (item: DetailedTargetingItem) {
    if (!item.id) {
      this.toggleBranch(item);
    } else {
      if (this.selectedItems && this.selectedItems.indexOf(item.key) > -1) {
        this.removeItem(item);
      } else {
        this.selectItem(item);
      }
    }
  };

  ngOnInit () {
    /**
     * Update dropdown list when new items to browse
     */
    this.DetailedTargetingDropdownBrowseService.items.subscribe(items => {
      this.items = items;

      this.updateTemplate();
    });

    /**
     * Update items from dropdown (toggle checkboxes) when selected items changes
     */
    this.DetailedTargetingSelectedService.items.subscribe((items: DetailedTargetingItem[]) => {
      console.info(`DetailedTargetingSelectedService items:`, items);
      this.selectedItems = items.map(item => item.id);

      this.updateTemplate();
    });

    /**
     * Toggle mode if changed
     */
    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      this.updateTemplate();
    });
  }

}
