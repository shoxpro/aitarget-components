import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Input, Output } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { EventEmitter } from '@angular/common/src/facade/async';

@Component({
  selector:        'geo-targeting-mode-dropdown',
  templateUrl:     './geo-targeting-mode-dropdown.component.html',
  styleUrls:       ['./geo-targeting-mode-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingModeDropdownComponent implements OnInit, OnDestroy {
  _subscriptions = [];

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

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  constructor (private changeDetectorRef: ChangeDetectorRef,
               private translateService: TranslateService) { }

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
