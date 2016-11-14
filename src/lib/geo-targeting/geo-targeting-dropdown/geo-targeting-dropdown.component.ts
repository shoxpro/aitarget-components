import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef
} from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { Subject } from 'rxjs';
import { arrowUp$, arrowDown$, enter$ } from '../../shared/constants/event-streams.constants';

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

  constructor (private changeDetectorRef: ChangeDetectorRef) { }

  ngOnChanges (changes) {
    if (changes.items.currentValue !== changes.items.previousValue ||
      changes.isOpen.currentValue !== changes.isOpen.previousValue
    ) {
      this.activeItemIndex = 0;
    }
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    arrowUp$
      .takeUntil(this.destroy$)
      .do((e: KeyboardEvent) => e.preventDefault())
      .mapTo(-1)
      .merge(arrowDown$
        .do((e: KeyboardEvent) => e.preventDefault())
        .mapTo(1))
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

    enter$
      .takeUntil(this.destroy$)
      .do((e: KeyboardEvent) => e.preventDefault())
      .filter(() => this.isOpen)
      .subscribe(() => {
        this.select.emit(this.items[this.activeItemIndex]);
      });
  }

}
