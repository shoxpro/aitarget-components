import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef
} from '@angular/core';
import { GeoItem } from '../geo-item.interface';
import { Subject } from 'rxjs/Subject';
import { arrowUp$, arrowDown$, enter$ } from '../../../../../shared/constants/event-streams.constants';

@Component({
  selector:        'fba-geo-dropdown',
  templateUrl:     'geo-dropdown.component.html',
  styleUrls:       ['geo-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDropdownComponent implements OnInit, OnDestroy, OnChanges {

  destroy$ = new Subject();

  @Input() items: GeoItem[];
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
        this.changeDetectorRef.detectChanges();
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
