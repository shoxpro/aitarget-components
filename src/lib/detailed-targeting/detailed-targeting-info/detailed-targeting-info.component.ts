import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from './detailed-targeting-info.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TypeToHumanPipe } from '../type-to-human.pipe';
import { Subject } from 'rxjs';

@Component({
  selector:        'detailed-targeting-info',
  templateUrl:     'detailed-targeting-info.component.html',
  styleUrls:       ['detailed-targeting-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailedTargetingInfoComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  item: DetailedTargetingItem;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.ref.detach();
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private detailedTargetingInfoService: DetailedTargetingInfoService,
               private translateService: TranslateService,
               private ref: ChangeDetectorRef) {}

  getDescription (item: DetailedTargetingItem) {
    let description: string;
    let lastCrumb       = item.path[item.path.length - 1];
    let typeToHumanPipe = new TypeToHumanPipe(this.translateService);
    switch (item.type) {
      case 'interests':
        description = this.translateService.instant('detailed-targeting-info.DESCRIBE_INTERESTS') +
          ` <i>${lastCrumb}</i>`;
        break;
      default:
        description = this.translateService.instant('detailed-targeting-info.DESCRIBE_DEFAULT', {
          type: typeToHumanPipe.transform(item.type),
          name: lastCrumb
        });
    }
    return description;
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedTargetingInfoService.item
        .takeUntil(this.destroy$)
        .subscribe((item: DetailedTargetingItem) => {
          this.item = item;
          this.updateTemplate();
        });
  }

}
