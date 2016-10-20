import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse.service';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { DetailedTargetingSearchService } from '../detailed-targeting-search/detailed-targeting-search.service';

@Component({
  selector:        'detailed-targeting-dropdown-browse',
  templateUrl:     'detailed-targeting-dropdown-browse.component.html',
  styleUrls:       ['detailed-targeting-dropdown-browse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailedTargetingDropdownBrowseComponent implements OnInit, OnDestroy {
  items;
  selectedItemsCombinedIds;
  openItems;
  subscriptions = [];

  constructor (private detailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
               private detailedTargetingApiService: DetailedTargetingApiService,
               private detailedTargetingSelectedService: DetailedTargetingSelectedService,
               private detailedTargetingInfoService: DetailedTargetingInfoService,
               private elementRef: ElementRef,
               private translateService: TranslateService,
               private detailedTargetingSearchService: DetailedTargetingSearchService,
               private ref: ChangeDetectorRef) {
    this.openItems = this.detailedTargetingDropdownBrowseService.getOpenItems();
  }

  combinedId = (item) => [item.type, item.id].join('.');

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  /**
   * If branch is closed, than close all it's children as well
   * @param item
   * @param openItems
   * @param openKeys
   */
  closeChildrenNodes (item, openItems, openKeys) {
    if (openItems[item.key]) {
      return;
    }
    openKeys.forEach(key => {
      if (key.indexOf(item.key) > -1) {
        openItems[key] = false;
      }
    });
  }

  getScrollToItemKey (item, openItems) {
    if (openItems[item.key]) {
      return item.key;
    } else {
      let lastIndex = item.key.lastIndexOf(' > ');
      return item.key.slice(0, lastIndex > -1 ? lastIndex : item.key.length);
    }
  }

  /**
   * Open or close browse rows when clicked
   * @param item
   */
  toggleBranch (item: DetailedTargetingItem) {
    // Get all open keys
    let openItems = this.detailedTargetingDropdownBrowseService.getOpenItems();
    let openKeys  = Object.keys(openItems);

    // Toggle branch by item.key
    openItems[item.key] = !Boolean(openItems[item.key]);

    // Toggle Nodes
    this.closeChildrenNodes(item, openItems, openKeys);

    // Decide where to scroll
    openItems._scrollTo = this.getScrollToItemKey(item, openItems);

    this.detailedTargetingDropdownBrowseService.updateOpenItems(openItems);
  }

  /**
   * Select row item from the browse list
   * @param item
   */
  selectItem (item: DetailedTargetingItem) {
    // Set selected property for checkboxes
    item.selected = true;

    let selectedItems = this.detailedTargetingSelectedService.get();

    let selectedItemsFiltered = selectedItems.filter(selected => {
      return selected.type === item.type && selected.id === item.id;
    });

    let alreadyAdded: boolean = Boolean(selectedItemsFiltered.length);

    if (!alreadyAdded) {
      selectedItems.push(item);
    }

    this.detailedTargetingSelectedService.updateSelected(selectedItems);
  }

  /**
   * Remove row item from previously selected
   * @param itemToRemove
   */
  removeItem (itemToRemove: DetailedTargetingItem) {
    // Set selected property for checkboxes
    itemToRemove.selected = false;

    let selectedItems = this.detailedTargetingSelectedService.get();

    selectedItems = selectedItems.filter(item => {
      return itemToRemove.type !== item.type || item.id !== itemToRemove.id;
    });

    this.detailedTargetingSelectedService.updateSelected(selectedItems);
  }

  /**
   * Show row's info when hovered
   * @param item
   */
  setDropdownInfoItem (item: DetailedTargetingItem) {
    let value = item && item.id ? item : null;
    this.detailedTargetingInfoService.update(value);
  }

  /**
   * Dropdown item click handler.
   * Open item branch if not last item with id, select or remove clicked item to/from selected items.
   * @param item
   */
  clickItem (item: DetailedTargetingItem) {
    if (item.id) {
      if (this.selectedItemsCombinedIds && this.selectedItemsCombinedIds.indexOf(this.combinedId(item)) > -1) {
        this.removeItem(item);
      } else {
        this.selectItem(item);
      }
      return;
    }
    if (item.searchable) {
      this.detailedTargetingSearchService.update({isVisible: true, type: item.type});
      return;
    }
    this.toggleBranch(item);
  };

  /**
   * Scroll dropdown list to clicked item.key
   * @param key
   */
  scrollTo (key) {
    if (!key) {
      return;
    }

    let elm     = this.elementRef.nativeElement;
    let list    = elm.querySelector('ul');
    let itemRow = elm.querySelector(`[data-key="${key}"]`);

    if (itemRow) {
      list.scrollTop = itemRow.offsetTop;
    }
  }

  /**
   * Add selected property to browse items that are selected
   */
  toggleSelected = () => {
    if (!this.selectedItemsCombinedIds || !this.items) {
      return;
    }
    this.items.forEach((item: DetailedTargetingItem) => {
      item.selected = this.selectedItemsCombinedIds.indexOf(this.combinedId(item)) > -1;
    });
  };

  ngOnInit () {
    /**
     * Update dropdown list when new items to browse
     */
    this.subscriptions.push(this.detailedTargetingDropdownBrowseService.items
                                .map(items => {
                                  return items.filter(item => item.key !== '__ROOT__')
                                              .map((item, index, list) => {
                                                if (!item.id && list[index + 1].key.indexOf(item.key) === -1) {
                                                  item.searchable = true;
                                                }
                                                if (!item.id && list[index + 1].id) {
                                                  let children  = [];
                                                  let nextIndex = index + 1;
                                                  while (list[nextIndex] && list[nextIndex].id) {
                                                    children.push(list[nextIndex]);
                                                    nextIndex += 1;
                                                  }

                                                  item.isParent = true;
                                                  item.children = children;
                                                }
                                                return item;
                                              });
                                })
                                .subscribe(items => {
                                  this.items = items;

                                  this.toggleSelected();

                                  this.updateTemplate();
                                }));

    /**
     * Update items from dropdown (toggle checkboxes) when selected items changes
     */
    this.subscriptions.push(this.detailedTargetingSelectedService.items
                                .map((items: DetailedTargetingItem[]) => items.map(item => this.combinedId(item)))
                                .subscribe((selectedItems: Array<string>) => {
                                  this.selectedItemsCombinedIds = selectedItems;

                                  this.toggleSelected();

                                  this.updateTemplate();
                                }));

    /**
     * If openItems change reflect these changes it in a template.
     */
    this.subscriptions.push(this.detailedTargetingDropdownBrowseService.openItems.subscribe((openItems) => {
      this.openItems = openItems;
      this.updateTemplate();
      setTimeout(() => {
        this.scrollTo(openItems._scrollTo);
      });
    }));

    /**
     * Load suggestions on first init
     */
    this.detailedTargetingApiService.browse();

    /**
     * Load suggestions when language changes
     */
    this.subscriptions.push(this.translateService.onLangChange.subscribe(() => {
      this.detailedTargetingApiService.browse();
    }));
  }

}
