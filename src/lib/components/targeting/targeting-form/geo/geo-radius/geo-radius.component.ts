import {
  Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import { GeoItem } from '../geo-item.interface';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { GeoService } from '../geo.service';
import { Subject } from 'rxjs/Subject';
import { MILE_MIN, KILOMETER_MIN, MILE_MAX, KILOMETER_MAX, CUSTOM_LOCATION_RADIUS_MIN } from './geo-radius.constants';
import { escape$, arrowUp$, arrowDown$, enter$ } from '../../../../../shared/constants/event-streams.constants';
import { GeoIdService } from '../geo.id';

@Component({
  selector:        'fba-geo-radius',
  templateUrl:     'geo-radius.component.html',
  styleUrls:       ['geo-radius.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:   ViewEncapsulation.None
})
export class GeoRadiusComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  fbaAppendToSelector;

  _itemOriginal;
  _itemCopy;

  @Input() set item (item) {
    this._itemOriginal = item;
    this._itemCopy     = Object.assign({}, item);
  }

  get item (): GeoItem {
    return this._itemCopy;
  }

  isOpen: boolean = false;
  max;
  min: number     = 0;

  /**
   * Set default radius min and max
   */
  setDefaultBoundaries () {
    this.min = this.item.distance_unit === 'mile' ? MILE_MIN : KILOMETER_MIN;

    /**
     * Minimum radius for custom_location is different.
     * @See https://developers.facebook.com/docs/marketing-api/targeting-specs#location
     */
    if (['custom_location', 'place'].includes(this.item.type)) {
      this.min = CUSTOM_LOCATION_RADIUS_MIN;
    }

    this.max = this.item.distance_unit === 'mile' ? MILE_MAX : KILOMETER_MAX;

    this.changeDetectorRef.markForCheck();
  }

  /**
   * Change distance unit
   * @param distanceUnit
   */
  setDistanceUnit (distanceUnit) {
    this.item.distance_unit = distanceUnit;
    this.setDefaultBoundaries();
    this.onChange(this.item.radius);
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Open/Close radius selection dropdown
   */
  toggleDropdown (event?) {
    if (event) {
      event.stopPropagation();
    }

    this.isOpen = !this.isOpen;

    // Restore original item when closing dropdown
    if (!this.isOpen) {
      this.item = this._itemOriginal;
    }

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Enable radius by returning original item state
   */
  enableRadius () {
    this.item = this._itemOriginal;
    if (this.item.radius === 0) {
      this.item.radius = this.min;
    }
    this.setDefaultBoundaries();
  }

  /**
   * Disable radius by setting radius to 0
   */
  disableRadius () {
    this.min         = 0;
    this.item.radius = 0;
  }

  /**
   * When radius change
   * @param radius
   */
  onChange (radius: number | null) {
    if (!radius) {
      return;
    }
    if (radius < this.min) {
      return this.onChange(this.min);
    }
    if (radius > this.max) {
      return this.onChange(this.max);
    }
    this.item.radius = radius;
    this.changeDetectorRef.markForCheck();
  }

  constructor (private geoSelectedService: GeoSelectedService,
               private geoService: GeoService,
               private geoIdService: GeoIdService,
               private changeDetectorRef: ChangeDetectorRef) {
    this.fbaAppendToSelector = `#${this.geoIdService.id$.getValue()}`;
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.setDefaultBoundaries();

    /**
     * Process Escape when dropdown is open
     */
    escape$
      .takeUntil(this.destroy$)
      .do((e: KeyboardEvent) => e.preventDefault())
      .filter(() => this.isOpen)
      .subscribe(() => {
        this.toggleDropdown();
      });

    arrowUp$
      .takeUntil(this.destroy$)
      .do((e: KeyboardEvent) => e.preventDefault())
      .mapTo(1)
      .merge(arrowDown$
        .do((e: KeyboardEvent) => e.preventDefault())
        .mapTo(-1))
      .filter(() => this.isOpen)
      .subscribe((delta) => {
        this.item.radius += delta;
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
      });

    /**
     * Process Enter when dropdown is open
     */
    enter$
      .takeUntil(this.destroy$)
      .do((e: KeyboardEvent) => e.preventDefault())
      .merge(this.geoService.fbaClickOutsideOfComponent$)
      .filter(() => this.isOpen)
      .subscribe(() => {
        // Close dropdown and save value
        this.isOpen = false;
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
        // Update item with current radius
        this.geoSelectedService.updateItems([this.item]);
      });
  }

}
