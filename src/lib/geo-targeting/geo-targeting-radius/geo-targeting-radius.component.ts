import {
  Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';

@Component({
  selector:        'geo-targeting-radius',
  templateUrl:     './geo-targeting-radius.component.html',
  styleUrls:       ['./geo-targeting-radius.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:   ViewEncapsulation.None
})
export class GeoTargetingRadiusComponent implements OnInit, OnDestroy {

  @Input() item: GeoTargetingItem = {key: ''};

  private _subscriptions  = [];
  private isOpen: boolean = false;
  private max;
  private min: number     = 0;
  private previousItem;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  /**
   * Set default radius min and max
   */
  private setDefaultBoundaries () {
    if (this.item.distance_unit === 'mile') {
      this.max = 50;
    } else {
      this.max = 80;
    }

    this.updateTemplate();
  }

  /**
   * Change distance unit
   * @param distanceUnit
   */
  public setDistanceUnit (distanceUnit) {
    this.item.distance_unit = distanceUnit;
    this.setDefaultBoundaries();
    this.onChange(this.item.radius);
    this.updateTemplate();
  }

  /**
   * Open/Close radius selection dropdown
   * @param event
   */
  public toggleDropdown (event?) {
    if (event) {
      event.stopPropagation();
    }

    this.isOpen = !this.isOpen;

    // Update item with current radius when closing dropdown
    if (!this.isOpen) {
      this.GeoTargetingSelectedService.updateSelectedItem(this.item);
    }

    this.updateTemplate();
  }

  /**
   * Enable radius by returning previous item state
   */
  public enableRadius () {
    this.item = this.previousItem;
  }

  /**
   * Disable radius by setting radius to 0
   */
  public disableRadius () {
    this.previousItem = Object.assign({}, this.item);
    this.item.radius  = 0;
  }

  /**
   * When radius change
   * @param radius
   */
  public onChange (radius) {
    if (radius === null) {
      return;
    }
    if (radius < this.min) {
      return this.onChange(this.min);
    }
    if (radius > this.max) {
      return this.onChange(this.max);
    }
    this.item.radius = radius;
  }

  constructor (private TranslateService: TranslateService,
               private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private ChangeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.setDefaultBoundaries();

    this._subscriptions.push(
      this.TranslateService.onLangChange.subscribe(() => {
        this.updateTemplate();
      })
    );
  }

}
