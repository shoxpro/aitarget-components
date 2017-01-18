import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { GeoModeType } from './geo-mode.reducer';
import { GeoModeService } from './geo-mode.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'fba-geo-mode',
  templateUrl:     'geo-mode.component.html',
  styleUrls:       ['geo-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoModeComponent {

  @Input() selectedMode: GeoModeType;
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
      this.geoModeService.setMode(mode);
    }
  }

  toggleDropdown (isOpen, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.toggle.emit(isOpen);

    if (this.updateState) {
      this.geoModeService.toggleModeDropdown(isOpen);
    }
  }

  constructor (private _store: Store<AppState>,
               private geoModeService: GeoModeService) {
    // TODO: add key navigation
    this.model$ = this._store.let(this.geoModeService.getModel);
  }

}
