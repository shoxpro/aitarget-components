import {
  Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { Subject } from 'rxjs/Rx';

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
  private _itemStream     = new Subject<GeoTargetingItem>();
  private itemStream      = this._itemStream.asObservable();
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
   * Set default radius for passed language
   * @param lang
   */
  private setDefault (lang) {
    if (lang === 'en_US') {
      this.item.distance_unit = this.item.distance_unit || 'mile';
      this.item.radius        = this.item.radius || 25;
    } else {
      this.item.distance_unit = this.item.distance_unit || 'kilometer';
      this.item.radius        = this.item.radius || 40;
    }

    if (this.item.distance_unit === 'mile') {
      this.max = 50;
    } else {
      this.max = 80;
    }

    this._itemStream.next(this.item);
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
    this.updateTemplate();
  }

  /**
   * Enable radius by returning previous item state
   */
  public enableRadius () {
    this.item = this.previousItem;
    this._itemStream.next(this.item);
  }

  /**
   * Disable radius by setting radius to 0
   */
  public disableRadius () {
    this.previousItem = Object.assign({}, this.item);
    this.item.radius  = 0;
    this._itemStream.next(this.item);
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
    this._itemStream.next(this.item);
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
    /**
     * Wrap it inside timeout to skip recursive ngOnInit
     */
    setTimeout(() => {
      this.setDefault(this.TranslateService.currentLang);
    });

    this._subscriptions.push(
      this.TranslateService.onLangChange.subscribe((lang: string) => {
        this.setDefault(lang);
        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.itemStream
          .debounceTime(100)
          .subscribe((item: GeoTargetingItem) => {
            this.GeoTargetingSelectedService.updateItem(item);
            this.updateTemplate();
          })
    );
  }

}
