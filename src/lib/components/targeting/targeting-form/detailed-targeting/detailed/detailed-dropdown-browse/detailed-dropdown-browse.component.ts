import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DetailedDropdownBrowseService } from './detailed-dropdown-browse.service';
import { DetailedApiService } from '../detailed-api/detailed-api.service';
import { DetailedSelectedService } from '../detailed-selected/detailed-selected.service';
import { DetailedItem } from '../detailed-item';
import { DetailedInfoService } from '../detailed-info/detailed-info.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { DetailedSearchService } from '../detailed-search/detailed-search.service';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-detailed-dropdown-browse',
  templateUrl:     'detailed-dropdown-browse.component.html',
  styleUrls:       ['detailed-dropdown-browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailedDropdownBrowseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  items;
  selectedItemsCombinedIds;
  openItems;

  constructor (private detailedDropdownBrowseService: DetailedDropdownBrowseService,
               private detailedApiService: DetailedApiService,
               private detailedSelectedService: DetailedSelectedService,
               private detailedInfoService: DetailedInfoService,
               private elementRef: ElementRef,
               private translateService: TranslateService,
               private detailedSearchService: DetailedSearchService,
               private changeDetectorRef: ChangeDetectorRef) {
    this.openItems = this.detailedDropdownBrowseService.getOpenItems();
  }

  combinedId = (item) => [item.type, item.id].join('.');

  ngOnDestroy () {
    this.destroy$.next();
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
  toggleBranch (item: DetailedItem) {
    // Get all open keys
    let openItems = this.detailedDropdownBrowseService.getOpenItems();
    let openKeys  = Object.keys(openItems);

    // Toggle branch by item.key
    openItems[item.key] = !Boolean(openItems[item.key]);

    // Toggle Nodes
    this.closeChildrenNodes(item, openItems, openKeys);

    // Decide where to scroll
    openItems._scrollTo = this.getScrollToItemKey(item, openItems);

    this.detailedDropdownBrowseService.updateOpenItems(openItems);
  }

  /**
   * Select row item from the browse list
   * @param item
   */
  selectItem (item: DetailedItem) {
    // Set selected property for checkboxes
    item.selected = true;

    let selectedItems = this.detailedSelectedService.get();

    let selectedItemsFiltered = selectedItems.filter(selected => {
      return selected.type === item.type && selected.id === item.id;
    });

    let alreadyAdded: boolean = Boolean(selectedItemsFiltered.length);

    if (!alreadyAdded) {
      selectedItems.unshift(item);
    }

    this.detailedSelectedService.updateSelected(selectedItems);
  }

  /**
   * Remove row item from previously selected
   * @param itemToRemove
   */
  removeItem (itemToRemove: DetailedItem) {
    // Set selected property for checkboxes
    itemToRemove.selected = false;

    let selectedItems = this.detailedSelectedService.get();

    selectedItems = selectedItems.filter(item => {
      return itemToRemove.type !== item.type || item.id !== itemToRemove.id;
    });

    this.detailedSelectedService.updateSelected(selectedItems);
  }

  /**
   * Show row's info when hovered
   * @param item
   */
  setDropdownInfoItem (item: DetailedItem) {
    let value = item && item.id ? item : null;
    this.detailedInfoService.update(value);
  }

  /**
   * Dropdown item click handler.
   * Open item branch if not last item with id, select or remove clicked item to/from selected items.
   * @param item
   */
  clickItem (item: DetailedItem) {
    if (item.id) {
      if (this.selectedItemsCombinedIds && this.selectedItemsCombinedIds.indexOf(this.combinedId(item)) > -1) {
        this.removeItem(item);
      } else {
        this.selectItem(item);
      }
      return;
    }
    if (item.searchable) {
      this.detailedSearchService.update({isVisible: true, type: item.type});
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
    this.items.forEach((item: DetailedItem) => {
      item.selected = this.selectedItemsCombinedIds.indexOf(this.combinedId(item)) > -1;
    });
  };

  ngOnInit () {
    /**
     * Update dropdown list when new items to browse
     */
    this.detailedDropdownBrowseService.items
        .takeUntil(this.destroy$)
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

          this.changeDetectorRef.markForCheck();
        });

    /**
     * Update items from dropdown (toggle checkboxes) when selected items changes
     */
    this.detailedSelectedService.items
        .takeUntil(this.destroy$)
        .map((items: DetailedItem[]) => items.map(item => this.combinedId(item)))
        .subscribe((selectedItems: Array<string>) => {
          this.selectedItemsCombinedIds = selectedItems;

          this.toggleSelected();

          this.changeDetectorRef.markForCheck();
        });

    /**
     * If openItems change changeDetectorReflect these changes it in a template.
     */
    this.detailedDropdownBrowseService.openItems
        .takeUntil(this.destroy$)
        .subscribe((openItems) => {
          this.openItems = openItems;
          this.changeDetectorRef.markForCheck();
          setTimeout(() => {
            this.scrollTo(openItems._scrollTo);
          });
        });

    /**
     * Load suggestions on first init
     */
    this.detailedApiService.browse();

    /**
     * Load suggestions when language changes
     */
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.detailedApiService.browse();
        });
  }

}
