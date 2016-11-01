import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef
} from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingService } from '../geo-targeting.service';
import { Subject } from 'rxjs';

@Component({
  selector:        'geo-targeting-dropdown',
  templateUrl:     './geo-targeting-dropdown.component.html',
  styleUrls:       ['./geo-targeting-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingDropdownComponent implements OnInit, OnDestroy, OnChanges {

  destroy$ = new Subject();

  @Input() items: GeoTargetingItem[];
  @Input() isOpen;

  @Output() select = new EventEmitter();

  activeItemIndex = 0;

  constructor (private geoTargetingService: GeoTargetingService,
               private changeDetectorRef: ChangeDetectorRef) { }

  ngOnChanges (changes) {
    if (changes.items.currentValue !== changes.items.previousValue ||
      changes.isOpen.currentValue !== changes.isOpen.previousValue
    ) {
      this.activeItemIndex = 0;
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.geoTargetingService.arrowUpStream.mapTo(-1)
        .takeUntil(this.destroy$)
        .merge(this.geoTargetingService.arrowDownStream.mapTo(1))
        .filter(() => this.isOpen)
        .subscribe((delta) => {
          this.activeItemIndex += delta;

          if (this.activeItemIndex < 0) {
            this.activeItemIndex = this.items.length - 1;
          }

          if (this.activeItemIndex > this.items.length - 1) {
            this.activeItemIndex = 0;
          }

          this.changeDetectorRef.markForCheck();
        });

    this.geoTargetingService.enterStream
        .takeUntil(this.destroy$)
        .filter(() => this.isOpen)
        .subscribe(() => {
          this.select.emit(this.items[this.activeItemIndex]);
        });
  }

}
