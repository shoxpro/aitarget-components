import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { DetailedModeService } from './detailed-mode.service';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-detailed-mode',
  templateUrl:     'detailed-mode.component.html',
  styleUrls:       ['detailed-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedModeComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  @Input() type: string;

  mode;

  constructor (private detailedModeService: DetailedModeService,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  setMode = (mode: string) => {
    if (this.mode === mode) {
      mode = null;
    }
    this.detailedModeService.set(mode);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedModeService.mode
        .takeUntil(this.destroy$)
        .subscribe((mode: string) => {
          this.mode = mode;

          this.changeDetectorRef.markForCheck();
        });
  }

}
