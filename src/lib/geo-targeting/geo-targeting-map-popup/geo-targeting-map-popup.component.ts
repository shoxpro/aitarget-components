import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector:        'geo-targeting-map-popup',
  templateUrl:     './geo-targeting-map-popup.component.html',
  styleUrls:       ['./geo-targeting-map-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingMapPopupComponent implements OnInit, OnDestroy {
  @Input('item') item: GeoTargetingItem;

  _subscriptions = [];
  isOpen         = false;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  setExcluded (item: GeoTargetingItem, excluded: boolean) {
    item.excluded = excluded;
    this.geoTargetingSelectedService.updateSelectedItem(item);
  }

  /**
   * Toggle Dropdown
   */
  toggleDropdown (event?) {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
    this.updateTemplate();
  }

  remove () {
    this.geoTargetingSelectedService.remove(this.item);
  }

  constructor (private changeDetectorRef: ChangeDetectorRef,
               private translateService: TranslateService,
               private geoTargetingSelectedService: GeoTargetingSelectedService) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        this.updateTemplate();
      })
    );
  }

}
