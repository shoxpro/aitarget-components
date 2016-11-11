import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DetailedTargetingModeService } from './detailed-targeting-mode.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
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

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.ref.detach();
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private detailedTargetingModeService: DetailedTargetingModeService,
               private translateService: TranslateService,
               private ref: ChangeDetectorRef) {
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

          this.updateTemplate();
        });

    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.updateTemplate();
        });
  }

}
