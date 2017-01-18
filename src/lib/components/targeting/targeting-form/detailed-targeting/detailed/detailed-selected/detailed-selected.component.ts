/* tslint:disable:max-line-length */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { DetailedSelectedService } from './detailed-selected.service';
import { DetailedItem } from '../detailed-item';
import { DetailedModeService } from '../detailed-mode/detailed-mode.service';
import { DetailedDropdownBrowseService } from '../detailed-dropdown-browse/detailed-dropdown-browse.service';
import { DetailedService } from '../detailed.service';
import { DetailedSearchService } from '../detailed-search/detailed-search.service';
import { Subject } from 'rxjs';
/* tslint:enable:max-line-length */

@Component({
  selector:        'fba-detailed-selected',
  templateUrl:     'detailed-selected.component.html',
  styleUrls:       ['detailed-selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedSelectedComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  items: DetailedItem[];

  structuredSelectedItems;
  groupHovered: Object = {};

  constructor (private detailedService: DetailedService,
               private detailedDropdownBrowseService: DetailedDropdownBrowseService,
               private detailedModeService: DetailedModeService,
               private detailedSelectedService: DetailedSelectedService,
               private detailedSearchService: DetailedSearchService,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  /**
   * Open clicked crumb in browse dropdown and scroll to it
   * @param key
   * @param index
   */
  showCrumb (key: string, index: number) {
    let path             = key.split(' > ');
    let defaultOpenItems = this.detailedDropdownBrowseService.defaultOpenItems;
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
    this.detailedSearchService.update({isVisible: false, type: null});

    this.detailedModeService.set('browse');
    this.detailedDropdownBrowseService.updateOpenItems(openItems);
  }

  removeGroup (key) {
    let selectedItems = this.detailedSelectedService.get();

    // Extended id with respect to item's type
    let combinedId = (item) => [item.type, item.id].join('.');

    let combinedIdsToRemove = this.structuredSelectedItems.map[key].map(item => combinedId(item));

    selectedItems = selectedItems.filter(item => combinedIdsToRemove.indexOf(combinedId(item)) === -1);

    this.detailedSelectedService.updateSelected(selectedItems);
  }

  removeItem (itemToRemove: DetailedItem) {
    let selectedItems = this.detailedSelectedService.get();
    let shouldRemove  = (item) => item.id === itemToRemove.id && item.type === itemToRemove.type;
    selectedItems     = selectedItems.filter(item => !shouldRemove(item));

    this.detailedSelectedService.updateSelected(selectedItems);
  }

  hoverGroup (key, isHovered) {
    this.groupHovered[key] = isHovered;
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedSelectedService.items
        .takeUntil(this.destroy$)
        .subscribe((items: DetailedItem[]) => {
          this.items = items;
          this.detailedService.updateWithSelectedItems(this.items);
        });

    this.detailedSelectedService.items
        .takeUntil(this.destroy$)
        .map(this.detailedSelectedService.structureSelectedItems)
        .subscribe((structuredSelectedItems) => {
          this.structuredSelectedItems = structuredSelectedItems;
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
  }

}
