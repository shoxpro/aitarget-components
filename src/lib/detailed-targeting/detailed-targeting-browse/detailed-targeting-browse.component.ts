import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingSearchService } from '../detailed-targeting-search/detailed-targeting-search.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';

@Component({
  selector:    'detailed-targeting-browse',
  templateUrl: './detailed-targeting-browse.component.html',
  styleUrls:   ['./detailed-targeting-browse.component.scss']
})
export class DetailedTargetingBrowseComponent implements OnInit, OnDestroy {
  mode;
  isVisible;
  subscriptions = [];
  activeInfo;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private detailedTargetingModeService: DetailedTargetingModeService,
               private detailedTargetingSearchService: DetailedTargetingSearchService,
               private detailedTargetingInfoService: DetailedTargetingInfoService,
               private ref: ChangeDetectorRef) { }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    /**
     * Toggle mode if changed
     */
    this.subscriptions.push(this.detailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;
      this.updateTemplate();
    }));

    this.subscriptions.push(this.detailedTargetingSearchService.data.subscribe((data) => {
      this.isVisible = data.isVisible;
      this.updateTemplate();
    }));

    /**
     * Indicate that info is open. Needed to set proper border-radius to dropdown.
     */
    this.subscriptions.push(this.detailedTargetingInfoService.item.subscribe((item: DetailedTargetingItem) => {
      this.activeInfo = Boolean(item);
      this.updateTemplate();
    }));
  }

}
