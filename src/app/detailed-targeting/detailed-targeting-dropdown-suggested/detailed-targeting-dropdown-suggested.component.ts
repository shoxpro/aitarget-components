import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingInputService } from '../detailed-targeting-input/detailed-targeting-input.service';
import { TypeToHumanPipe } from '../type-to-human.pipe';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-dropdown-suggested',
  templateUrl: 'detailed-targeting-dropdown-suggested.component.html',
  styleUrls: ['detailed-targeting-dropdown-suggested.component.css'],
  pipes: [TypeToHumanPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailedTargetingDropdownSuggestedComponent implements OnInit {

  public items: DetailedTargetingItem[];
  private mode;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
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
              id: item.id,
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
  }

}
