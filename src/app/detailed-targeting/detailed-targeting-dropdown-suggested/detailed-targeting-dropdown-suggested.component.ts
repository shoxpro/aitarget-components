import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingInputService } from '../detailed-targeting-input/detailed-targeting-input.service';

@Component({
  selector:        'detailed-targeting-dropdown-suggested',
  templateUrl:     'detailed-targeting-dropdown-suggested.component.html',
  styleUrls:       ['detailed-targeting-dropdown-suggested.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailedTargetingDropdownSuggestedComponent implements OnInit {

  public items: DetailedTargetingItem[];
  private mode;
  private activeInfo;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.detach();
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  private suggest (targetingList: Array<Object> = []) {
    this.DetailedTargetingApiService.suggest(targetingList);
  }

  constructor (private DetailedTargetingDropdownSuggestedService: DetailedTargetingDropdownSuggestedService,
               private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private DetailedTargetingSelectedService: DetailedTargetingSelectedService,
               private DetailedTargetingModeService: DetailedTargetingModeService,
               private DetailedTargetingApiService: DetailedTargetingApiService,
               private DetailedTargetingInputService: DetailedTargetingInputService,
               private ref: ChangeDetectorRef) {
  }

  public setDropdownInfoItem (item: DetailedTargetingItem) {
    this.DetailedTargetingInfoService.update(item);
  }

  public selectItem (item: DetailedTargetingItem) {
    let selectedItems = this.DetailedTargetingSelectedService.get();

    let selectedItemsFiltered = selectedItems.filter(selected => {
      return selected.type === item.type && selected.id === item.id;
    });

    let alreadyAdded: boolean = Boolean(selectedItemsFiltered.length);

    if (!alreadyAdded) {
      selectedItems.push(item);
    }

    this.DetailedTargetingInputService.setTerm('');

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  ngOnInit () {
    //Load suggested items
    this.DetailedTargetingApiService.suggest();

    this.DetailedTargetingDropdownSuggestedService.items.subscribe(items => {
      this.items = items;

      this.updateTemplate();
    });

    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      this.updateTemplate();
    });

    /**
     * Load suggested items when list of selected items changes
     */
    this.DetailedTargetingSelectedService.items
        .filter(items => items.length > 0)
        .map((items: DetailedTargetingItem[]) => {
          return items.map(item => {
            return {
              id:   item.id,
              type: item.type
            };
          });
        })
        .subscribe((targetingList: Array<Object>) => {
          if (this.DetailedTargetingModeService.get() === 'search') {
            this.DetailedTargetingModeService.set('suggested');
          }
          this.suggest(targetingList);

          this.updateTemplate();
        });

    /**
     * Indicate that info is open. Needed to set proper border-radius to dropdown.
     */
    this.DetailedTargetingInfoService.item.subscribe((item: DetailedTargetingItem) => {
      this.activeInfo = Boolean(item);
      this.updateTemplate();
    });
  }

}
