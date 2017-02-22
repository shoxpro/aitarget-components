import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DetailedModeService } from '../detailed-mode/detailed-mode.service';
import { DetailedSearchService } from '../detailed-search/detailed-search.service';
import { DetailedItem } from '../detailed-item';
import { DetailedInfoService } from '../detailed-info/detailed-info.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector:    'fba-detailed-browse',
  templateUrl: 'detailed-browse.component.html',
  styleUrls:   ['detailed-browse.component.scss']
})
export class DetailedBrowseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  mode;
  isVisible;
  activeInfo;

  constructor (private detailedModeService: DetailedModeService,
               private detailedSearchService: DetailedSearchService,
               private detailedInfoService: DetailedInfoService,
               private changeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    /**
     * Toggle mode if changed
     */
    this.detailedModeService.mode
        .takeUntil(this.destroy$)
        .subscribe((mode: string) => {
          this.mode = mode;
          this.changeDetectorRef.markForCheck();
        });

    this.detailedSearchService.data
        .takeUntil(this.destroy$)
        .subscribe((data) => {
          this.isVisible = data.isVisible;
          this.changeDetectorRef.markForCheck();
        });

    /**
     * Indicate that info is open. Needed to set proper border-radius to dropdown.
     */
    this.detailedInfoService.item
        .takeUntil(this.destroy$)
        .subscribe((item: DetailedItem) => {
          this.activeInfo = Boolean(item);
          this.changeDetectorRef.markForCheck();
        });
  }

}
