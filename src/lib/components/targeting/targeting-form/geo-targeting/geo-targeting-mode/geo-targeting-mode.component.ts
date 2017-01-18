import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { GeoTargetingModeType } from './geo-targeting-mode.reducer';
import { GeoTargetingModeService } from './geo-targeting-mode.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'geo-targeting-mode',
  templateUrl:     'geo-targeting-mode.component.html',
  styleUrls:       ['geo-targeting-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingModeComponent {

  @Input() selectedMode: GeoTargetingModeType;
  @Input() isOpen: boolean      = false;
  @Input() appendTarget: string;
  @Input() updateState: boolean = false;

  @Output() modeChange = new EventEmitter();
  @Output() toggle     = new EventEmitter();

  model$;

  selectMode (mode) {
    this.modeChange.emit(mode);
    this.selectedMode = mode;

    if (this.updateState) {
      this.geoTargetingModeService.setMode(mode);
    }
  }

  toggleDropdown (isOpen, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.toggle.emit(isOpen);

    if (this.updateState) {
      this.geoTargetingModeService.toggleModeDropdown(isOpen);
    }
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingModeService: GeoTargetingModeService) {
    // TODO: add key navigation
    this.model$ = this._store.let(this.geoTargetingModeService.getModel);
  }

}
