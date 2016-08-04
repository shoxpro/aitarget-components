import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingDropdownBrowseService } from './detailed-targeting-dropdown-browse.service';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-dropdown-browse',
  templateUrl: 'detailed-targeting-dropdown-browse.component.html',
  styleUrls: ['detailed-targeting-dropdown-browse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedTargetingDropdownBrowseComponent implements OnInit {
  private mode;
  private items;
  public openItems: Object = {
    __ROOT__: true
  };

  constructor (private DetailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
               private DetailedTargetingApiService: DetailedTargetingApiService,
               private DetailedTargetingModeService: DetailedTargetingModeService,
               private ref: ChangeDetectorRef) {}

  public clickItem (item) {
    if (!item.id) {
      this.openItems[item.key] = !Boolean(this.openItems[item.key]);
    }
  };

  ngOnInit () {
    this.DetailedTargetingDropdownBrowseService.items.subscribe(items => {
      this.items = items;

      this.ref.markForCheck();
      this.ref.detectChanges();
    });

    this.DetailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      if (mode === 'browse') {
        this.DetailedTargetingApiService.browse();
      }

      this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }

}
