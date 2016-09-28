import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector:        'geo-targeting-type',
  templateUrl:     './geo-targeting-type.component.html',
  styleUrls:       ['./geo-targeting-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingTypeComponent implements OnInit, OnDestroy {

  private _subscriptions = [];

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  constructor (private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.updateTemplate();
  }

}
