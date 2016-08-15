import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingModeService } from './detailed-targeting-mode.service';

@Component({
  selector: 'detailed-targeting-mode',
  templateUrl: 'detailed-targeting-mode.component.html',
  styleUrls: ['detailed-targeting-mode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedTargetingModeComponent implements OnInit {

  private mode;

  public setMode = (mode: string) => {
    this.DetailedTargetingModeService.set(mode);
  };

  constructor (private DetailedTargetingModeService: DetailedTargetingModeService,
               private ref: ChangeDetectorRef) {}

  ngOnInit () {
    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }

}
