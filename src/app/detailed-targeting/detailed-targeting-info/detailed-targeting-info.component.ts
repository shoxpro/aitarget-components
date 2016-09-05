import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from './detailed-targeting-info.service';

@Component({
  selector:        'detailed-targeting-info',
  templateUrl:     'detailed-targeting-info.component.html',
  styleUrls:       ['detailed-targeting-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailedTargetingInfoComponent implements OnInit {

  public item: DetailedTargetingItem;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.detach();
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private DetailedTargetingInfoService: DetailedTargetingInfoService,
               private ref: ChangeDetectorRef) {}

  public getDescription (item: DetailedTargetingItem) {
    let description: string;
    let lastCrumb = item.path[item.path.length - 1];
    switch (item.type) {
      case 'interests':
        description = `People who have expressed an interest in or like pages related to <i>${lastCrumb}</i>`;
        break;
      default:
        description = `People who listed their ${item.type} as <i>${lastCrumb}</i> in their Facebook profile.`;
    }
    return description;
  }

  ngOnInit () {
    this.DetailedTargetingInfoService.item.subscribe((item: DetailedTargetingItem) => {
      this.item = item;
      this.updateTemplate();
    });
  }

}
