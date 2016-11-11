/* tslint:disable:max-line-length */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingDropdownBrowseService } from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { DetailedTargetingService } from '../detailed-targeting.service';
import { DetailedTargetingSearchService } from '../detailed-targeting-search/detailed-targeting-search.service';
import { Subject } from 'rxjs';
/* tslint:enable:max-line-length */

@Component({
  selector:        'detailed-targeting-selected',
  templateUrl:     'detailed-targeting-selected.component.html',
  styleUrls:       ['detailed-targeting-selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingSelectedComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  items: DetailedTargetingItem[];

  structuredSelectedItems;
  groupHovered: Object = {};

  constructor (private detailedTargetingService: DetailedTargetingService,
               private detailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
               private detailedTargetingModeService: DetailedTargetingModeService,
               private detailedTargetingSelectedService: DetailedTargetingSelectedService,
               private detailedTargetingSearchService: DetailedTargetingSearchService,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  /**
   * Open clicked crumb in browse dropdown and scroll to it
   * @param key
   * @param index
   */
  showCrumb (key: string, index: number) {
    let path             = key.split(' > ');
    let defaultOpenItems = this.detailedTargetingDropdownBrowseService.defaultOpenItems;
    // noinspection TypeScriptUnresolvedFunction
    let openItems        = Object.assign({}, defaultOpenItems);

    path.forEach((crumb: string, pos: number) => {
      if (pos <= index) {
        let openItemKey = path.slice(0, pos + 1)
                              .join(' > ');

        openItems._scrollTo    = openItemKey;
        openItems[openItemKey] = true;
      }
    });

    // Close search mode before opening browse tree
    this.detailedTargetingSearchService.update({isVisible: false, type: null});

    this.detailedTargetingModeService.set('browse');
    this.detailedTargetingDropdownBrowseService.updateOpenItems(openItems);
  }

  removeGroup (key) {
    let selectedItems = this.detailedTargetingSelectedService.get();

    // Extended id with respect to item's type
    let combinedId = (item) => [item.type, item.id].join('.');

    let combinedIdsToRemove = this.structuredSelectedItems.map[key].map(item => combinedId(item));

    selectedItems = selectedItems.filter(item => combinedIdsToRemove.indexOf(combinedId(item)) === -1);

    this.detailedTargetingSelectedService.updateSelected(selectedItems);
  }

  removeItem (itemToRemove: DetailedTargetingItem) {
    let selectedItems = this.detailedTargetingSelectedService.get();
    let shouldRemove  = (item) => item.id === itemToRemove.id && item.type === itemToRemove.type;
    selectedItems     = selectedItems.filter(item => !shouldRemove(item));

    this.detailedTargetingSelectedService.updateSelected(selectedItems);
  }

  hoverGroup (key, isHovered) {
    this.groupHovered[key] = isHovered;
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedTargetingSelectedService.items
        .takeUntil(this.destroy$)
        .subscribe((items: DetailedTargetingItem[]) => {
          this.items = items;
          this.detailedTargetingService.updateWithSelectedItems(this.items);
        });

    this.detailedTargetingSelectedService.items
        .takeUntil(this.destroy$)
        .map(this.detailedTargetingSelectedService.structureSelectedItems)
        .subscribe((structuredSelectedItems) => {
          this.structuredSelectedItems = structuredSelectedItems;
          this.changeDetectorRef.markForCheck();
        });
  }

}
