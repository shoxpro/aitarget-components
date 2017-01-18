import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { GeoItem } from '../geo-item.interface';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { GeoModeService } from '../geo-mode/geo-mode.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoModeType, GeoModeIdType } from '../geo-mode/geo-mode.reducer';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-geo-map-popup',
  templateUrl:     'geo-map-popup.component.html',
  styleUrls:       ['geo-map-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoMapPopupComponent {
  @Input('item') item: GeoItem;

  destroy$ = new Subject();
  modelMode$;

  isOpen = false;

  selectMode (item: GeoItem, mode: GeoModeType) {
    if (<string>mode.id === 'delete') {
      this.geoSelectedService.removeItems([this.item]);
    } else {
      const excluded    = mode.id === (<GeoModeIdType>'exclude');
      const updatedItem = Object.assign({}, item, {excluded});
      this.geoSelectedService.updateItems([updatedItem]);
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
               private geoModeService: GeoModeService,
               private geoSelectedService: GeoSelectedService) {
    this.modelMode$ = this._store.let(this.geoModeService.getModel);
  }
}
