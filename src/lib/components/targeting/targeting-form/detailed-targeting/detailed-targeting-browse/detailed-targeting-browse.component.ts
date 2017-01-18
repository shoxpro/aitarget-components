import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingSearchService } from '../detailed-targeting-search/detailed-targeting-search.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { Subject } from 'rxjs';

@Component({
  selector:    'detailed-targeting-browse',
  templateUrl: 'detailed-targeting-browse.component.html',
  styleUrls:   ['detailed-targeting-browse.component.scss']
})
export class DetailedTargetingBrowseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  mode;
  isVisible;
  activeInfo;

  constructor (private detailedTargetingModeService: DetailedTargetingModeService,
               private detailedTargetingSearchService: DetailedTargetingSearchService,
               private detailedTargetingInfoService: DetailedTargetingInfoService,
               private changeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    /**
     * Toggle mode if changed
     */
    this.detailedTargetingModeService.mode
        .takeUntil(this.destroy$)
        .subscribe((mode: string) => {
          this.mode = mode;
          this.changeDetectorRef.markForCheck();
        });

    this.detailedTargetingSearchService.data
        .takeUntil(this.destroy$)
        .subscribe((data) => {
          this.isVisible = data.isVisible;
          this.changeDetectorRef.markForCheck();
        });

    /**
     * Indicate that info is open. Needed to set proper border-radius to dropdown.
     */
    this.detailedTargetingInfoService.item
        .takeUntil(this.destroy$)
        .subscribe((item: DetailedTargetingItem) => {
          this.activeInfo = Boolean(item);
          this.changeDetectorRef.markForCheck();
        });
  }

}
