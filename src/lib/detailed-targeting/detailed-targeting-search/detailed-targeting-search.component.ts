import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DetailedTargetingSearchService } from './detailed-targeting-search.service';

@Component({
  selector:        'detailed-targeting-search',
  templateUrl:     './detailed-targeting-search.component.html',
  styleUrls:       ['./detailed-targeting-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingSearchComponent implements OnInit, OnDestroy {
  private isVisible;
  private subscriptions = [];

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private DetailedTargetingSearchService: DetailedTargetingSearchService,
               private ref: ChangeDetectorRef) { }

  public closeSearch = () => {
    this.isVisible = false;
    this.DetailedTargetingSearchService.setVisible(this.isVisible);
  };

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.subscriptions.push(this.DetailedTargetingSearchService.visible.subscribe((isVisible: boolean) => {
      this.isVisible = isVisible;
      this.updateTemplate();
    }));
  }

}
