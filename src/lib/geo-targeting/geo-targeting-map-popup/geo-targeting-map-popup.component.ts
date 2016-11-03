import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingModeType, GeoTargetingModeIdType } from '../geo-targeting-mode/geo-targeting-mode.reducer';

@Component({
  selector:        'geo-targeting-map-popup',
  templateUrl:     './geo-targeting-map-popup.component.html',
  styleUrls:       ['./geo-targeting-map-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingMapPopupComponent implements OnInit, OnDestroy {
  @Input('item') item: GeoTargetingItem;

  modelMode$;

  _subscriptions = [];
  isOpen         = false;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  selectMode (item: GeoTargetingItem, mode: GeoTargetingModeType) {
    if (<string>mode.id === 'delete') {
      this.geoTargetingSelectedService.remove(this.item);
    } else {
      item.excluded = mode.id === (<GeoTargetingModeIdType>'exclude');
      this.geoTargetingSelectedService.updateSelectedItem(item);
    }
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

  constructor (private _store: Store<AppState>,
               private changeDetectorRef: ChangeDetectorRef,
               private translateService: TranslateService,
               private geoTargetingSelectedService: GeoTargetingSelectedService) {
    this.modelMode$ = this._store.let(GeoTargetingModeService.getModel);
  }

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
