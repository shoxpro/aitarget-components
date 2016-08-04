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
               private ref: ChangeDetectorRef) {}

  public setDropdownInfoItem (item: DetailedTargetingItem) {
    let value = item && item.id ? item : null;
    this.DetailedTargetingInfoService.update(value);
  }

  public selectItem (item: DetailedTargetingItem) {
    let selectedItems = this.DetailedTargetingSelectedService.get();

    let alreadyAdded: boolean = Boolean(selectedItems.filter(selected => selected.id === item.id).length);

    if (!alreadyAdded) {
      selectedItems.push(item);
    }

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  public removeItem (itemToRemove: DetailedTargetingItem) {
    let selectedItems = this.DetailedTargetingSelectedService.get();

    selectedItems = selectedItems.filter(item => item.id !== itemToRemove.id);

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  public clickItem (item: DetailedTargetingItem) {
    if (!item.id) {
      this.openItems[item.key] = !Boolean(this.openItems[item.key]);
    } else {
      if (this.selectedItems && this.selectedItems.indexOf(item.key) > -1) {
        this.removeItem(item);
      } else {
        this.selectItem(item);
      }
    }
  };

  ngOnInit () {
    this.DetailedTargetingDropdownBrowseService.items.subscribe(items => {
      this.items = items;

      this.ref.markForCheck();
      this.ref.detectChanges();
    });

    this.DetailedTargetingSelectedService.items.subscribe((items: DetailedTargetingItem[]) => {
      this.selectedItems = items.map(item => item.key);
      console.info(`this.selectedItems:`, this.selectedItems);
    });

    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      if (mode === 'browse') {
        this.DetailedTargetingApiService.browse();
      }

      this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }

}
