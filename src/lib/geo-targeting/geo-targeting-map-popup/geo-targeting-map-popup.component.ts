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

  private _subscriptions = [];
  private isOpen         = false;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  /**
   * Toggle Dropdown
   */
  public toggleDropdown (event?) {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
    this.updateTemplate();
  }

  public setExcluded (item: GeoTargetingItem, excluded: boolean) {
    item.excluded = excluded;
    this.GeoTargetingSelectedService.remove(item);
    this.GeoTargetingSelectedService.add(item);
  }

  /**
   * Remove passed item from selected items list
   * @param item
   * @param event
   */
  public removeItem (item: GeoTargetingItem) {
    this.GeoTargetingSelectedService.remove(item);
  }

  constructor (private ChangeDetectorRef: ChangeDetectorRef,
               private TranslateService: TranslateService,
               private GeoTargetingSelectedService: GeoTargetingSelectedService) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.TranslateService.onLangChange.subscribe(() => {
        this.updateTemplate();
      })
    );
  }

}
