import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingModeService } from './detailed-targeting-mode.service';

@Component({
  selector:        'detailed-targeting-mode',
  templateUrl:     'detailed-targeting-mode.component.html',
  styleUrls:       ['detailed-targeting-mode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingModeComponent implements OnInit {

  private mode;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.detach();
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private DetailedTargetingModeService: DetailedTargetingModeService,
               private ref: ChangeDetectorRef) {
  }

  public setMode = (mode: string) => {
    this.DetailedTargetingModeService.set(mode);
  };

  ngOnInit () {
    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      this.updateTemplate();
    });
  }

}
