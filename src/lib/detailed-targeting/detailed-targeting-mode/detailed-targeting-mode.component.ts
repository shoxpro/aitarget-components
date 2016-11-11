import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DetailedTargetingModeService } from './detailed-targeting-mode.service';
import { Subject } from 'rxjs';

@Component({
  selector:        'detailed-targeting-mode',
  templateUrl:     'detailed-targeting-mode.component.html',
  styleUrls:       ['detailed-targeting-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingModeComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  mode;

  constructor (private detailedTargetingModeService: DetailedTargetingModeService,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  setMode = (mode: string) => {
    if (this.mode === mode) {
      mode = null;
    }
    this.detailedTargetingModeService.set(mode);
  };

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedTargetingModeService.mode
        .takeUntil(this.destroy$)
        .subscribe((mode: string) => {
          this.mode = mode;

          this.changeDetectorRef.markForCheck();
        });
  }

}
