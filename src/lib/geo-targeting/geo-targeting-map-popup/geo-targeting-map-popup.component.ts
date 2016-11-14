import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingModeType, GeoTargetingModeIdType } from '../geo-targeting-mode/geo-targeting-mode.reducer';
import { Subject } from 'rxjs';

@Component({
  selector:        'geo-targeting-map-popup',
  templateUrl:     './geo-targeting-map-popup.component.html',
  styleUrls:       ['./geo-targeting-map-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingMapPopupComponent {
  @Input('item') item: GeoTargetingItem;

  destroy$ = new Subject();
  modelMode$;

  isOpen = false;

  selectMode (item: GeoTargetingItem, mode: GeoTargetingModeType) {
    if (<string>mode.id === 'delete') {
      this.geoTargetingSelectedService.removeItems([this.item]);
    } else {
      const excluded    = mode.id === (<GeoTargetingModeIdType>'exclude');
      const updatedItem = Object.assign({}, item, {excluded});
      this.geoTargetingSelectedService.updateItems([updatedItem]);
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
    this.changeDetectorRef.markForCheck();
  }

  constructor (private _store: Store<AppState>,
               private changeDetectorRef: ChangeDetectorRef,
               private geoTargetingModeService: GeoTargetingModeService,
               private geoTargetingSelectedService: GeoTargetingSelectedService) {
    this.modelMode$ = this._store.let(this.geoTargetingModeService.getModel);
  }
}
