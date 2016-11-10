import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector:    'browse-multi-select',
  templateUrl: 'browse-multi-select.component.html',
  styleUrls:   ['browse-multi-select.component.scss']
})
export class BrowseMultiSelectComponent implements AfterViewInit {

  el: HTMLElement;

  @Input('item') item: DetailedTargetingItem;

  constructor (private elRef: ElementRef,
               private translateService: TranslateService,
               private detailedTargetingSelectedService: DetailedTargetingSelectedService) {
    this.el = elRef.nativeElement;
  }

  change (checked: boolean) {
    // Update selected property in children items and get all children ids
    let childrenIds = this.item.children.map((item: DetailedTargetingItem) => {
      item.selected = checked;
      return item.id;
    });

    // Get currently selected items
    let selectedItems    = this.detailedTargetingSelectedService.get();
    // Filter out all children items from currently selected items
    let newSelectedItems = selectedItems.filter((item: DetailedTargetingItem) => {
      return childrenIds.indexOf(item.id) === -1;
    });

    // Add children items if selected
    if (checked) {
      newSelectedItems = newSelectedItems.concat(this.item.children);
    }

    this.detailedTargetingSelectedService.updateSelected(newSelectedItems);
  }

  /**
   * Set checked or indeterminate state
   */
  checkState () {
    let selectedChildren    = this.item.children.filter((item: DetailedTargetingItem) => {
      return item.selected;
    });
    let hasSelectedChildren = selectedChildren.length;
    let allChildrenSelected = selectedChildren.length === this.item.children.length;
    let isIndeterminate     = hasSelectedChildren && !allChildrenSelected;

    let checkbox = <HTMLInputElement>this.el.querySelector('input[type="checkbox"]');
    let label    = this.el.querySelector('span.browse-multi-select__label-text');

    if (!checkbox) {
      return;
    }

    checkbox.indeterminate = isIndeterminate;
    checkbox.checked       = isIndeterminate ? false : (allChildrenSelected || null);

    if (checkbox.checked) {
      label.textContent = this.translateService.instant('browse-multi-select.UNSELECT_ALL');
    } else {
      label.textContent = this.translateService.instant('browse-multi-select.SELECT_ALL');
    }
  }

  ngAfterViewInit () {
    this.detailedTargetingSelectedService.items.subscribe(() => {
      this.checkState();
    });
  }
}
