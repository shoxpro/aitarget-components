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
  private _subscriptions = [];

  @Input('hasRemove') hasRemove: Boolean = false;
  @Input('excluded') excluded: Boolean   = false;

  @Output()
  public toggle  = new EventEmitter();
  @Output()
  public include = new EventEmitter();
  @Output()
  public exclude = new EventEmitter();
  @Output()
  public remove  = new EventEmitter();

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  constructor (private ChangeDetectorRef: ChangeDetectorRef,
               private TranslateService: TranslateService) { }

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
