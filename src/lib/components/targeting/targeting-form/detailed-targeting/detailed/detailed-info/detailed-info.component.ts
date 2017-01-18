import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { DetailedItem } from '../detailed-item';
import { DetailedInfoService } from './detailed-info.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TypeToHumanPipe } from '../type-to-human.pipe';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-detailed-info',
  templateUrl:     'detailed-info.component.html',
  styleUrls:       ['detailed-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailedInfoComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  item: DetailedItem;

  constructor (private detailedInfoService: DetailedInfoService,
               private translateService: TranslateService,
               private changeDetectorRef: ChangeDetectorRef) {}

  getDescription (item: DetailedItem) {
    let description: string;
    let lastCrumb       = item.path[item.path.length - 1];
    let typeToHumanPipe = new TypeToHumanPipe(this.translateService);
    switch (item.type) {
      case 'interests':
        description = this.translateService.instant('fba-detailed-info.DESCRIBE_INTERESTS') +
          ` <i>${lastCrumb}</i>`;
        break;
      default:
        description = this.translateService.instant('fba-detailed-info.DESCRIBE_DEFAULT', {
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
    this.detailedInfoService.item
        .takeUntil(this.destroy$)
        .subscribe((item: DetailedItem) => {
          this.item = item;
          this.changeDetectorRef.markForCheck();
        });
  }

}
