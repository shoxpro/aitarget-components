import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingDropdownDefaultService } from './detailed-targeting-dropdown-default.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-dropdown-default',
  templateUrl: 'detailed-targeting-dropdown-default.component.html',
  styleUrls: ['detailed-targeting-dropdown-default.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailedTargetingDropdownDefaultComponent implements OnInit {

  public items: DetailedTargetingItem[];

  constructor (private DetailedTargetingDropdownDefaultService: DetailedTargetingDropdownDefaultService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private DetailedTargetingSelectedService: DetailedTargetingSelectedService,
               private ref: ChangeDetectorRef) {}

  public setDropdownInfoItem (item: DetailedTargetingItem) {
    this.DetailedTargetingInfoService.update(item);
  }

  public selectItem (item: DetailedTargetingItem) {
    let selectedItems = this.DetailedTargetingSelectedService.get();

    let alreadyAdded: boolean = Boolean(selectedItems.filter(selected => selected.id === item.id).length);

    if (!alreadyAdded) {
      selectedItems.push(item);
    }

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  ngOnInit () {
    this.DetailedTargetingDropdownDefaultService.items.subscribe(items => {
      this.items = items;

      this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }

}
