import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingDropdownBrowseService } from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';
import { DetailedTargetingService } from '../detailed-targeting.service';
import { DetailedTargetingSearchService } from '../detailed-targeting-search/detailed-targeting-search.service';

@Component({
  selector:        'detailed-targeting-selected',
  templateUrl:     'detailed-targeting-selected.component.html',
  styleUrls:       ['detailed-targeting-selected.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingSelectedComponent implements OnInit {

  private items: DetailedTargetingItem[];

  private structuredSelectedItems;
  private groupHovered: Object = {};

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.detach();
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private DetailedTargetingService: DetailedTargetingService,
               private DetailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
               private DetailedTargetingModeService: DetailedTargetingModeService,
               private DetailedTargetingSelectedService: DetailedTargetingSelectedService,
               private DetailedTargetingSearchService: DetailedTargetingSearchService,
               private ref: ChangeDetectorRef) {
  }

  /**
   * Open clicked crumb in browse dropdown and scroll to it
   * @param key
   * @param index
   */
  public showCrumb (key: string, index: number) {
    let path             = key.split(' > ');
    let defaultOpenItems = this.DetailedTargetingDropdownBrowseService.defaultOpenItems;
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
    this.DetailedTargetingSearchService.update({isVisible: false, type: null});

    this.DetailedTargetingModeService.set('browse');
    this.DetailedTargetingDropdownBrowseService.updateOpenItems(openItems);
  }

  public removeGroup (key) {
    let selectedItems = this.DetailedTargetingSelectedService.get();

    // Extended id with respect to item's type
    let combinedId = (item) => [item.type, item.id].join('.');

    let combinedIdsToRemove = this.structuredSelectedItems.map[key].map(item => combinedId(item));

    selectedItems = selectedItems.filter(item => combinedIdsToRemove.indexOf(combinedId(item)) === -1);

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  public removeItem (itemToRemove: DetailedTargetingItem) {
    let selectedItems = this.DetailedTargetingSelectedService.get();
    let shouldRemove  = (item) => item.id !== itemToRemove.id && item.type === itemToRemove.type;
    selectedItems     = selectedItems.filter(item => shouldRemove(item));

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  public hoverGroup (key, isHovered) {
    this.groupHovered[key] = isHovered;
    this.updateTemplate();
  }

  ngOnInit () {
    this.DetailedTargetingSelectedService.items
        .subscribe((items: DetailedTargetingItem[]) => {
          this.items = items;
          this.DetailedTargetingService.updateWithSelectedItems(this.items);
        });

    this.DetailedTargetingSelectedService.items
        .map(this.DetailedTargetingSelectedService.structureSelectedItems)
        .subscribe((structuredSelectedItems) => {
          this.structuredSelectedItems = structuredSelectedItems;
          this.updateTemplate();
        });
  }

}
