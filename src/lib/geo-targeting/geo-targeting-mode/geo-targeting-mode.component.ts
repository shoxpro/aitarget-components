import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GeoTargetingModeService } from './geo-targeting-mode.service';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'geo-targeting-mode',
  templateUrl:     './geo-targeting-mode.component.html',
  styleUrls:       ['./geo-targeting-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingModeComponent {

  model$;

  setMode (mode) {
    this.geoTargetingModeService.setMode(mode);
  }

  toggleDropdown (isOpen, event?) {
    if (event) {
      event.stopPropagation();
    }
    this.geoTargetingModeService.toggleModeDropdown(isOpen);
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingModeService: GeoTargetingModeService) {
    this.model$ = this._store.let(GeoTargetingModeService.getModel);
    // TODO: add key navigation
  }

}
