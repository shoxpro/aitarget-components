import { Component, AfterViewInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { DetailedItem } from '../detailed-item';
import { DetailedSelectedService } from '../detailed-selected/detailed-selected.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Subject } from 'rxjs';

@Component({
  selector:    'fba-browse-multi-select',
  templateUrl: 'browse-multi-select.component.html',
  styleUrls:   ['browse-multi-select.component.scss']
})
export class BrowseMultiSelectComponent implements AfterViewInit, OnDestroy {

  destroy$ = new Subject();

  el: HTMLElement;

  @Input('item') item: DetailedItem;

  constructor (private elRef: ElementRef,
               private translateService: TranslateService,
               private detailedSelectedService: DetailedSelectedService) {
    this.el = this.elRef.nativeElement;
  }

  change (checked: boolean) {
    // Update selected property in children items and get all children ids
    let childrenIds = this.item.children.map((item: DetailedItem) => {
      item.selected = checked;
      return item.id;
    });

    // Get currently selected items
    let selectedItems    = this.detailedSelectedService.get();
    // Filter out all children items from currently selected items
    let newSelectedItems = selectedItems.filter((item: DetailedItem) => {
      return childrenIds.indexOf(item.id) === -1;
    });

    // Add children items if selected
    if (checked) {
      newSelectedItems = newSelectedItems.concat(this.item.children);
    }

    this.detailedSelectedService.updateSelected(newSelectedItems);
  }

  /**
   * Set checked or indeterminate state
   */
  checkState () {
    let selectedChildren    = this.item.children.filter((item: DetailedItem) => {
      return item.selected;
    });
    let hasSelectedChildren = selectedChildren.length;
    let allChildrenSelected = selectedChildren.length === this.item.children.length;
    let isIndeterminate     = hasSelectedChildren && !allChildrenSelected;

    let checkbox = <HTMLInputElement>this.el.querySelector('input[type="checkbox"]');
    let label    = this.el.querySelector('span.fba-browse-multi-select__label-text');

    if (!checkbox) {
      return;
    }

    checkbox.indeterminate = isIndeterminate;
    checkbox.checked       = isIndeterminate ? false : (allChildrenSelected || null);

    if (checkbox.checked) {
      label.textContent = this.translateService.instant('fba-browse-multi-select.UNSELECT_ALL');
    } else {
      label.textContent = this.translateService.instant('fba-browse-multi-select.SELECT_ALL');
    }
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngAfterViewInit () {
    this.detailedSelectedService.items
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.checkState();
        });
  }
}
