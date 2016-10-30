import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';

@Component({
  selector:        'geo-targeting-mode-dropdown',
  templateUrl:     './geo-targeting-mode-dropdown.component.html',
  styleUrls:       ['./geo-targeting-mode-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingModeDropdownComponent {
  @Input('hasRemove') hasRemove: Boolean = false;
  @Input('excluded') excluded: Boolean   = false;

  @Output()
  toggle  = new EventEmitter();
  @Output()
  include = new EventEmitter();
  @Output()
  exclude = new EventEmitter();
  @Output()
  remove  = new EventEmitter();

  constructor () { }
}
