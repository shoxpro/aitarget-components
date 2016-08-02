import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-dropdown-browse',
  templateUrl: 'detailed-targeting-dropdown-browse.component.html',
  styleUrls: ['detailed-targeting-dropdown-browse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedTargetingDropdownBrowseComponent implements OnInit {
  private mode;

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
