import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingSearchService } from '../detailed-targeting-search/detailed-targeting-search.service';

@Component({
  selector:    'detailed-targeting-browse',
  templateUrl: './detailed-targeting-browse.component.html',
  styleUrls:   ['./detailed-targeting-browse.component.css']
})
export class DetailedTargetingBrowseComponent implements OnInit, OnDestroy {
  private mode;
  private isVisible;
  private subscriptions = [];

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private DetailedTargetingModeService: DetailedTargetingModeService,
               private DetailedTargetingSearchService: DetailedTargetingSearchService,
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
    this.subscriptions.push(this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;
      this.updateTemplate();
    }));

    this.subscriptions.push(this.DetailedTargetingSearchService.visible.subscribe((isVisible: boolean) => {
      this.isVisible = isVisible;
      this.updateTemplate();
    }));
  }

}
