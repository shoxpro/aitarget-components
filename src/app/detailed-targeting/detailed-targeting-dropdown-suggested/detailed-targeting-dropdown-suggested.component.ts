import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-dropdown-suggested',
  templateUrl: 'detailed-targeting-dropdown-suggested.component.html',
  styleUrls: ['detailed-targeting-dropdown-suggested.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailedTargetingDropdownSuggestedComponent implements OnInit {

  public items: DetailedTargetingItem[];
  private mode;

  constructor (private DetailedTargetingDropdownSuggestedService: DetailedTargetingDropdownSuggestedService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private DetailedTargetingSelectedService: DetailedTargetingSelectedService,
               private DetailedTargetingModeService: DetailedTargetingModeService,
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
    this.DetailedTargetingDropdownSuggestedService.items.subscribe(items => {
      this.items = items;

      this.ref.markForCheck();
      this.ref.detectChanges();
    });

    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }

}
